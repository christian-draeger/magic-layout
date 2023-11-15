"use client";

import React, {useState} from "react";
import LayoutSection from "@/components/layout/LayoutSection";
import {AppBar, Box, Divider, IconButton, Stack, styled, Toolbar, Tooltip, Typography} from "@mui/material";
import CatalogSection from "@/components/catalogue/CatalogSection";
import HowToUseInfoBox from "@/components/HowToUseInfoBox";
import InfoIcon from "@mui/icons-material/Info";

const StyledDivider = styled(Divider)`
  border-right-width: thick;
  border-style: dashed;
`;

export default function Home() {

    const [isHelpOpen, setIsHelpOpen] = useState(true);

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static" color="primary" enableColorOnDark>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        Widget Toolkit
                    </Typography>
                    <Tooltip open={isHelpOpen} title={<HowToUseInfoBox/>} arrow>
                        <IconButton onClick={() => setIsHelpOpen(!isHelpOpen)}>
                            <InfoIcon/>
                        </IconButton>
                    </Tooltip>
                </Toolbar>
            </AppBar>
            <Stack direction="row">
                <CatalogSection/>
                <StyledDivider orientation="vertical" flexItem/>
                <LayoutSection/>
            </Stack>
        </Box>
    )
}
