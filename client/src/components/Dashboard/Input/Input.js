import React from "react";
import "./Input.css";

export const Input = props =>
	<div className="form-group">
		<label>
			{props.labelname}:
			<input className="form-control" {...props} />
		</label>

	</div>;