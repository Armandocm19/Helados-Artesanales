import { Grid } from "@mui/material";
import { FC } from "react";
import { IIcecream } from "../../../interfaces";
import { IcecreamCard } from "./IcecreamCard";

interface Props {
    icecreams: IIcecream[];
}

export const IcecreamList: FC<Props> = ({ icecreams }) => {

    return (
        <Grid container spacing={4} sx={{ mt: 1 }}>
            {
                icecreams.map(item => (
                    <IcecreamCard 
                        key={item.slug}
                        icecream={item}
                    />
                ))
            }
        </Grid>
    )

}