import React, { useState } from "react";
import { FormControl, Grid, TextField, InputLabel, Select, Box, MenuItem, Button } from '@mui/material';
import Employee from "../../model/Employee";
import employeeConfig from "../../config/employees-config.json"
import InputResult from "../../model/InputResult";
type Props = {
    submitFn: (empl: Employee) => Promise<InputResult>,
    
}
const initialEmployee: Employee = {
    id: 0, birthDate: new Date(), name: '',
    department: '', salary: 0, gender: 'female'
};
export const EmployeeForm: React.FC<Props> = ({ submitFn }) => {
    const { minYear, minSalary, maxYear, maxSalary, departments }
        = employeeConfig;
    const [employee, setEmployee] =
        useState<Employee>(initialEmployee);
    function handlerName(event: any) {
        const name = event.target.value;
        const emplCopy = { ...employee };
        emplCopy.name = name;
        setEmployee(emplCopy);
    }
    function handlerBirthdate(event: any) {
        const birthDate = event.target.value;
        const emplCopy = { ...employee };
        emplCopy.birthDate = new Date(birthDate);
        setEmployee(emplCopy);
    }
    function handlerSalary(event: any) {
        const salary: number = +event.target.value;
        const emplCopy = { ...employee };
        emplCopy.salary = salary;
        setEmployee(emplCopy);
    }
    function handlerDepartment(event: any) {
        const department = event.target.value;
        const emplCopy = { ...employee };
        emplCopy.department = department;
        setEmployee(emplCopy);
    }
    function onSubmitFn(event: any) {
        event.preventDefault();
        submitFn(employee);
        document.querySelector('form')!.reset();
    }
    function onResetFn(event: any) {
        setEmployee(initialEmployee);
    }

    return <Box sx={{ marginTop: { sm: "25vh" } }}>
        <form onSubmit={onSubmitFn} onReset={onResetFn}>
            <Grid container spacing={4} justifyContent="center">
                <Grid item xs={8} sm={5} >
                    <FormControl fullWidth required>
                        <InputLabel id="select-department-id">Department</InputLabel>
                        <Select labelId="select-department-id" label="Department"
                            value={employee.department} onChange={handlerDepartment}>
                            <MenuItem value=''>None</MenuItem>
                            {departments.map(dep => <MenuItem value={dep}>{dep}</MenuItem>)}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={8} sm={5} >
                    <TextField type="text" required fullWidth label="Employee name"
                        helperText="enter Employee name" onChange={handlerName}
                        value={employee.name}  />
                </Grid>
                <Grid item xs={8} sm={5} >
                    <TextField type="date" required fullWidth label="birthDate"
                        value={employee.birthDate.} inputProps={{
                            
                            min: `${minYear}-01-01`,
                            max: `${maxYear}-12-31`
                        }} InputLabelProps={{
                            shrink: true
                        }} onChange={handlerBirthdate} />
                </Grid>
                <Grid item xs={8} sm={5} >
                    <TextField label="salary" fullWidth required
                        type="number" onChange={handlerSalary}
                        value={employee.salary || ''}
                        helperText={`enter salary in range [${minSalary}-${maxSalary}]`}
                        inputProps={{
                            min: `${minSalary}`,
                            max: `${maxSalary}`
                        }}  />
                </Grid>
            </Grid>




<Box sx={{ marginTop: {xs: "10vh", sm:"5vh"}, textAlign: "center"}}>
    <Button type="submit">Submit</Button>
            <Button type="reset">Reset</Button>
</Box>
            


        </form>
    </Box>
}