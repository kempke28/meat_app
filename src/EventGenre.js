/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";


const EventGenre = ({ events }) => {
    const [data, setData] = useState([]);
    
    const pieColors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF8090"];
    
    //function to get the data from events
    const getData = () => {
        const genres = ['React', 'JavaScript', 'Node', 'jQuery', 'AngularJS'];
        const data = genres.map((genre) => {
            const value = events.filter(({ summary }) => summary.split(' ').includes(genre)).length
          return { name: genre, value };
        });
        return data;
    }

    //make the events take some effects with react useEffect
    useEffect(() => { setData(() => getData()); }, [events]);
   
   
 return (
    <ResponsiveContainer height = { 400 }>
        <PieChart width={400} height={400}>
            <Pie
                data={data}
                cx={300}
                cy={200}
                labelLine={true}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${ name } ${( percent * 100).toFixed(0)}%`}
                >
                {
                    data.map((entry, index) => <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} name={entry.name}/>)
                }
            </Pie>
        </PieChart>
    </ResponsiveContainer>
  );
}

export default EventGenre;