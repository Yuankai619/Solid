import React from "react";
import Paper from '@mui/material/Paper';
import LoginPanelTheme from "../themes/LoginPanelTheme";
import ParticleBackground from "../components/ParticleBackground";
import { styled ,ThemeProvider} from '@mui/material/styles';
function LoginPage(){
    // document.body.style.backgroundColor = "#222222";

    return(
        <div>
            <ParticleBackground />
            {/* 页面其他内容 */}
        </div>
       
    );
}

export default LoginPage;