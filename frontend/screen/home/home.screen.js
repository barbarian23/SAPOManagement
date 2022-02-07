import React, { useState, useEffect, useRef } from "react";
import '../../assets/css/home/home.css';
import '../../assets/css/home/modal.css';
import { TH_STT, TH_PHONE, TH_MONEY, TH_INFO, TH_TRACK, TR_TYPE_NUMBER, TR_TYPE_MONEY, TR_TYPE_ADD, sampleData } from "../../constants/home/home.constant";
import { ADD_PHONE, GET_LIST_PHONE, SEARCH_PHONE, SET_INTERVAL_PHONE, SET_WAIT_TIME } from "../../action/home/home.action";
import { useSelector, useDispatch } from 'react-redux';

export default function Home() {
    const [phone, setPhone] = useState("");
    const [money, setMoney] = useState(0);
    const [warningPhone, setWarningPhone] = useState("");

    return (
        <div>
            <div className="crawl-login" id="div_craw">
                Home
            </div>
        </div>
    );

}