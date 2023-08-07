import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import Advert from "../../model/Advert";
import { useMemo, useState } from "react";
import { categories,  getCategoryForms } from "../../config/adverts-config";
type Props = {
    submitFn: (advert: Advert) => Promise<void>;
    advertUpdate?: Advert
}
const initialAdvert: Advert = { category: '', price: 0, name: '' }
const AdvertForm: React.FC<Props> = ({ submitFn, advertUpdate }) => {
    const [advert, setAdvert] = useState(advertUpdate || initialAdvert);
    const [flProperties, setFlProperties] = useState(!!advertUpdate);
    const categoriesForm: string[] = useMemo(()=>Array.from(categories.keys()), [])
    const data = useMemo(() => advert.category ? categories.get(advert.category) : undefined, [advert.category]);
    async function onSubmitFn(advert: Advert) {
        await submitFn(advert);
    }
    async function onSubmitNext (event: any) {
        event.preventDefault();
       setFlProperties(true);
       
    }
    function handlerCategory(event: any) {
        const category = event.target.value;
        const advertCopy = { ...advert };
        advertCopy.category = category;
        setAdvert(advertCopy);
    }
    function handlerName(event: any) {
        const name = event.target.value;
        const advertCopy = { ...advert };
        advertCopy.name = name;
        setAdvert(advertCopy);
    }
    function handlerPrice(event: any) {
        const price = +event.target.value;
        const advertCopy = { ...advert };
        advertCopy.price = price;
        setAdvert(advertCopy);
    }

    return <Box sx={{ marginTop: { sm: "5vh" } }}>
        <form onSubmit={onSubmitNext} >
            <Grid container spacing={4} justifyContent="center">
                <Grid item xs={8} sm={5} >
                    <FormControl fullWidth required>
                        <InputLabel id="select-category-id">Category</InputLabel>
                        <Select labelId="select-category-id" label="Category"
                            value={advert.category} onChange={handlerCategory}>
                            <MenuItem value=''>None</MenuItem>
                            {categoriesForm.map(c => <MenuItem value={c} key={c}>{c}</MenuItem>)}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={8} sm={5} >
                    <TextField type="text" required fullWidth label="Name"
                        helperText="enter name" onChange={handlerName}
                        value={advert.name} />
                </Grid>
                {data && <Grid item xs={8} sm={4} md={5} >
                    <TextField label="price" fullWidth required
                        type="number" onChange={handlerPrice}
                        value={advert.price || ''}
                        helperText={`enter price in range [${data.price.min}-${data.price.max}]`}
                        inputProps={{
                            min: `${data.price.min}`,
                            max: `${data.price.max}`
                        }} />
                </Grid>}
            </Grid>
            <Box sx={{ marginTop: { xs: "10vh", sm: "5vh" }, textAlign: "center" }}>
                {!flProperties &&<Button type="submit" >Next</Button>}
            </Box>



        </form>
        {flProperties && advert.category &&
         getCategoryForms(advert, onSubmitFn).get(advert.category)}

    </Box>
}

export default AdvertForm;