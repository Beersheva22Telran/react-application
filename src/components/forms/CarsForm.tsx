import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { Car, categories } from "../../config/adverts-config"
import Advert from "../../model/Advert";
import { useEffect, useMemo, useState } from "react";
type Props = {
    advert: Advert,
    submitFn: (advert: Advert) => Promise<void>
}

const CarsForm: React.FC<Props> = ({ advert, submitFn }) => {
    const advertCar = advert as Car;
    const [advertRes, setCar] = useState(advertCar)
    useEffect(() => {
        setCar(advert);
    }, [advert])
    const data = useMemo(() => categories.get("Cars"), []);

    function handlerCompany(event: any) {
        const company = event.target.value;
        const adCopy = { ...advertRes };
        adCopy.company = company;
        setCar(adCopy);
    }
    function handlerModel(event: any) {
        const model = event.target.value;
        const adCopy = { ...advertRes };
        adCopy.model = model;
        setCar(adCopy);
    }
    function handlerYear(event: any) {
        const year = +event.target.value;
        const adCopy = { ...advertRes };
        adCopy.year = year;
        setCar(adCopy);
    }
    function handlerColor(event: any) {
        const color = event.target.value;
        const adCopy = { ...advertRes };
        adCopy.color = color;
        setCar(adCopy);
    }
    function handlerKilometers(event: any) {
        const kilometers = event.target.value;
        const adCopy = { ...advertRes };
        adCopy.kilometers = kilometers;
        setCar(adCopy);
    }
    async function onSubmitFn(event: any) {
        event.preventDefault();
        await submitFn(advertRes);
    }
    return <form onSubmit={onSubmitFn}>
        <Grid container spacing={4} justifyContent="center">
            <Grid item xs={8} sm={5} >
                <FormControl fullWidth required>
                    <InputLabel id="select-company-id">Company</InputLabel>
                    <Select labelId="select-company-id" label="Company"
                        value={advertRes.company} onChange={handlerCompany}>
                        <MenuItem value=''>None</MenuItem>
                        {data.company.map((c: string) => <MenuItem value={c} key={c}>{c}</MenuItem>)}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={8} sm={5} >
                <FormControl fullWidth required>
                    <InputLabel id="select-model-id">Model</InputLabel>
                    <Select labelId="select-model-id" label="Model"
                        value={advertRes.model} onChange={handlerModel}>
                        <MenuItem value=''>None</MenuItem>
                        {advertRes.company && data.model[advertRes.company].map((c: string) => <MenuItem value={c} key={c}>{c}</MenuItem>)}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={8} sm={4} md={4} >
                <TextField label="year" fullWidth required
                    type="number" onChange={handlerYear}
                    value={advertRes.year || ''}
                    helperText={`enter year in range [${data.year.min}-${data.year.max}]`}
                    inputProps={{
                        min: `${data.year.min}`,
                        max: `${data.year.max}`
                    }} />
            </Grid>
            <Grid item xs={8} sm={4} >
                <FormControl fullWidth required>
                    <InputLabel id="select-color-id">Color</InputLabel>
                    <Select labelId="select-colot-id" label="Color"
                        value={advertRes.color} onChange={handlerColor}>
                        <MenuItem value=''>None</MenuItem>
                        {data.color.map((c: string) => <MenuItem value={c} key={c}>{c}</MenuItem>)}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={8} sm={4} md={4} >
                <TextField label="kilometers" fullWidth required
                    type="number" onChange={handlerKilometers}
                    value={advertRes.kilometers ?? ''}
                    helperText={`enter kilometers in range [${data.kilometers.min}-${data.kilometers.max}]`}
                    inputProps={{
                        min: `${data.kilometers.min}`,
                        max: `${data.kilometers.max}`
                    }} />
            </Grid>
        </Grid>
        <Box sx={{ marginTop: { xs: "10vh", sm: "1vh" }, textAlign: "center" }}>
            <Button type="submit" >Submit</Button>

        </Box>
    </form>
}
export default CarsForm