import {Button, Card, CardContent, CardHeader, IconButton, Stack} from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';
import EditIcon from '@mui/icons-material/Edit';
import React, {PropsWithChildren} from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const CatalogWidget = ({children}: PropsWithChildren) => {
    return (
        <div
            className="droppable-element"
            draggable="true"
            unselectable="on"
            onDragStart={e => e.dataTransfer.setData("text/plain", "")}
        >
            <Card>
                <CardHeader
                    title="Widget Name"
                    action={
                        <>
                            <IconButton>
                                <InfoIcon/>
                            </IconButton>
                            <IconButton>
                                <EditIcon/>
                            </IconButton>
                        </>
                    }
                />
                <CardContent>
                    {children}
                </CardContent>
            </Card>
        </div>
    )
}

const CatalogSection = () => {
    return (
        <Stack padding={2}>
            <h2>Widget Catalog</h2>
            <Stack spacing={2}>
                <p>Drag and drop widgets from here to the Layout Editor.</p>
                <Button
                    variant="outlined"
                    startIcon={<AddCircleOutlineIcon/>}
                >Add Widget
                </Button>
                <CatalogWidget>
                    Droppable Element (Drag me!)
                </CatalogWidget>
            </Stack>
        </Stack>
    )
}

export default CatalogSection;
