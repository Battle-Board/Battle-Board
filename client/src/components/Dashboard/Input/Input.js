import React from "react";

export const Input = props =>
	<div className="form-group">
		<label>
			{props.labelName}:
			<input className="form-control" {...props} />
		</label>

	</div>;