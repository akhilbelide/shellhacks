import React, { useState, useEffect } from 'react';

const Card = (props) => {
    props.trains.map((i) => {
        <div>
            <h1>Option</h1>
            <div>{i.start_station}</div>  
            <div>{i.end_station}</div>
            <div>{i.start_station}</div>  
            <div>{i.end_time}</div>
        </div>
        
        console.log(i)
    })
};

export default Card