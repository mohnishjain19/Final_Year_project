import React, { Fragment, useState , useEffect} from 'react'
import { useSelector } from 'react-redux'
import "./Display.css"
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import Loader from '../layout/Loader/Loader';



const Report = () => {

    const {isAuthenticated,user,loading}=useSelector(state=>state.user);
    const [count,setCount]=useState(0);


    function d()
    {
        setCount(prevCount => prevCount + 1);
    }
    useEffect(() => {
        setCount(user.reports.length);
      }, [user.reports]);
    
      const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
          field: 'fullName',
          headerName: 'Full name',
          description: 'This column has a value getter and is not sortable.',
          sortable: false,
          width: 160,
            
        },
        {
          field:'TestType',
          headerName:'Test Type',
          width:150,
          flex:0.2
          
        },
        {
          field:'Algorithm',
          headerName:'Algorithm',
          width:200,
          flex:0.4,
        },
        {
          field:'Result',
          headerName:'Result',
          width:250,
        },
        {
          field:'Accuracy',
          headerName:'Accuracy',
          width:300,
          flex:0.4,
        }
      ];
  
      const rows = [];
        user.reports && user.reports.forEach((item,index)=>{
          const parts = item.split(" ");
          let accuracy = parseFloat(parts[parts.length - 2]) * 100.0;
          accuracy = accuracy.toFixed(2);
          let s1="";
          for(let x=0;x<parts.length-5;x++)
          {
            s1=s1+parts[x]+" ";
          }
          rows.push({
            id:index,
            fullName:user.name,
            TestType:item.slice(-1),
            Algorithm:parts[parts.length-5]+" "+parts[parts.length-4]+" "+parts[parts.length-3],
            Result:s1,
            Accuracy:accuracy
          })


        });

      //   user.reports && user.reports.forEach((item,index)=>{
      //       console.log(item);
      //       // console.log(item.slice(-1));
      //       // console.log(item.split()[0]);
      //       // console.log(item.split()[1]);
      //   }
      // );

  return (

    <Fragment>
    {loading?<Loader />:<div className="myOrdersPage">
        <h4 class="hh">Total Number of Test taken {count}</h4>
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
          rows={rows}
          columns={columns}
          className="myOrdersTable"
          initialState={{
          pagination: {
              paginationModel: {
              pageSize: 5,
              },
          },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
      />
    </Box>

    </div>}
       
    </Fragment>

  )
}

export default Report