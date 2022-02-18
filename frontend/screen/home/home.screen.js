import React, { useState, useEffect, useRef } from "react";
import Product from "./Products.screen";
import Bill from "./Bills.screen";
import { LeftMenu } from "../../component";
import { Route } from "react-router-dom";

import '../../assets/css/home/home.css';

export default function Home() {
    return (
        <div className="parent">
            <div className="child-left">
            <   LeftMenu />
            </div>
            <div className="child-right">
                <Route path="/product">
                    <Product />
                </Route>
                <Route path="/bill">
                    <Bill />
                </Route>
            </div>
        </div>
    );

}