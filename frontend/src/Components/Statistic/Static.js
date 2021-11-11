import Navbar from "../Navbar"
import { useEffect, useState } from "react";
import { Redirect } from "react-router";
import { useCookies } from "react-cookie";
import StatisticTable from "./StatisticTable";
import StatisticPie from "./StatisticPie";
import StatisticBar from "./StatisticBar";
import { averagedataAction } from "../../store/averageDataStore";
import { useDispatch , useSelector } from "react-redux";
import TodayPie from "./TodayPie";

export default function MessMenu() {

    const [redirect, setRedirect] = useState(false);
    // const [menudata, setMenudata] = useState([]);
    // const [overalldata , setOveralldata] = useState({});
    const [todaydata , setTodaydata] = useState({})
    // const [submit  , setSubmit ]  = useState([]);
    const [cookies, setCookie] = useCookies(['user']); 

    const dispatch  = useDispatch();

    const menudataStore = useSelector(state => state.avgData.menudata);
    const likedataStore = useSelector(state => state.avgData.likedata);
    const submitdataStore = useSelector(state => state.avgData.submitdata);
    let temp = 0;

    useEffect(async () => {
        if (cookies.jwttoken) {
        } else { setRedirect(true); }


        if(menudataStore.length === 0){
            const menudataOne = await fetch(process.env.REACT_APP_BACKEND + "/form/form/like", {
                method: "GET",
                headers: { Accept: 'application/json', 'Content-Type': 'application/json' }
            })
            try{  menudataOne.json().then(data => {temp  = 1;  dispatch(averagedataAction.itemCheck(data)) })}
            catch{  console.log("Something went wrong with your request.") }
        }

        if(Object.keys(likedataStore).length === 0){
            const likedataOne = await fetch(process.env.REACT_APP_BACKEND + "/form/form/defaultlike", {
                method: "GET",
                headers: { Accept: 'application/json', 'Content-Type': 'application/json' }
            })
            try{ likedataOne.json().then(data => { temp = 1;  dispatch(averagedataAction.likedataCheck(data)) })}
            catch{  console.log("Something went wrong with your request.") }
        }

        if(submitdataStore.length === 0){
            const submitdataOne = await fetch(process.env.REACT_APP_BACKEND + "/form/form/totalsubmit", {
                method: "GET",
                headers: { Accept: 'application/json', 'Content-Type': 'application/json' }
            })
            try{ submitdataOne.json().then(data => { temp = 1;  dispatch(averagedataAction.submitdataCheck(data)) })}
            catch{  console.log("Something went wrong with your request.") }
        }
        
        const todaySubmitOne = await fetch(process.env.REACT_APP_BACKEND + "/form/form/todaysubmit", {
            method: "GET",
            headers: { Accept: 'application/json', 'Content-Type': 'application/json' }
        })
        try{
            todaySubmitOne.json().then(data =>{

                setTodaydata(data)
                console.log(data)
            })

        }catch{
            console.log("Something went wrong with your request.")
        }
    }, [temp])

    return (  
        <>
            <Navbar />
            { redirect && <Redirect to="/" />}
            { menudataStore && menudataStore.length !== 0 && <StatisticTable  value = {menudataStore} /> }
            { likedataStore && Object.keys(likedataStore).length && <StatisticPie value = {likedataStore} />}
            { submitdataStore && submitdataStore.length !== 0 && <StatisticBar v={submitdataStore} />}
            {todaydata && (Object.keys(todaydata).length && todaydata.likeonePer.length !== 0) ? <TodayPie value = {todaydata} /> : <h2 className="text-center mb-100">Not enough information to show current Statistic</h2>}
        </>
    )
}