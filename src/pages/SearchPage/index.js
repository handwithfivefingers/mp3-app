import React from "react";
import { useLocation } from "react-router";

export default function SearchPage(props) {
    const location = useLocation();
    console.log(location)

  return <div>SearchPage:{location.state}</div>;
}
