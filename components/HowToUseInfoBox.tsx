import {Alert, AlertTitle} from "@mui/material";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import PushPinIcon from "@mui/icons-material/PushPin";
import React from "react";

const HowToUseInfoBox = () => {
    return (
        <Alert severity="info" sx={{mb: 2, lineHeight: 2}}>
            <AlertTitle>How to use</AlertTitle>
            <p>
                <DragIndicatorIcon fontSize="small" sx={{verticalAlign: 'middle'}}/> <strong>Drag</strong> the
                widgets around to reposition them.
            </p>
            <p>
                <strong>Resize</strong> the widgets by dragging the bottom right corner.
            </p>
            <p>
                <AddCircleOutlineIcon fontSize="small" sx={{verticalAlign: 'middle'}}/><strong>Add</strong> a
                new widget by clicking the button below.
            </p>
            <p>
                <DeleteIcon fontSize="small" sx={{verticalAlign: 'middle'}}/><strong>Remove</strong> a widget by
                clicking the top right button on the widget.
            </p>
            <p>
                <PushPinIcon fontSize="small" sx={{verticalAlign: 'middle'}}/><strong>Pin</strong> a widget by
                clicking the top left button on the widget.
            </p>
        </Alert>
    )
}

export default HowToUseInfoBox;
