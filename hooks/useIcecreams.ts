import useSWR, { SWRConfiguration } from "swr";
import { IIcecream } from "../interfaces";

export const useIcecreams = ( url: string, config: SWRConfiguration = {} ) => {

    const { data, error } = useSWR<IIcecream[]>(`/api/${url}`, config);

    return {
        icecreamsData: data || [],
        isLoading: !error && !data,
        isError: error
    }

}