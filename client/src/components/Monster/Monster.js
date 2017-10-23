import React from "react";
import "./Monster.css"

const Monster = ({ props }) =>
    <div className="col-sm-4 monCard">
        <div class="panel panel-default">
            <div class="panel-body">
                <p className="monaName">{props.monsName}</p>
                <p className="bodyText"></p>
            </div>
        </div>
    </div>

export default Monster;
