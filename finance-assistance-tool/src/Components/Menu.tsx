import React from "react";
import { Box, Text } from "@chakra-ui/react";
import logo from "../assets/FinStimulate.png";

export default function Menu() {
  return (
    <>
      <div className="Menu">
        <ul>
          <li>
            <a className="active" href="/#">
              Today Trends
            </a>
          </li>
          <li>
            <a href="/#"> Top Companies</a>
          </li>
          <li>
            <a href="/#"> Login </a>
          </li>
          <li>
            <a className="register-button" href="/register">
              Register
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}
