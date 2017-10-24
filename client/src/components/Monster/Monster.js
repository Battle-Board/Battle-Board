import React from "react";
import "./Monster.css"

const Monster = ({ props }) =>
    <div className="col-sm-4 monsCard">
        <div class="panel panel-default">
            <div class="panel-body">
                <p className="monsName">{props.monsName}</p>
                <p className="bodyText"></p>
            </div>
        </div>
    </div>

export default Monster;
