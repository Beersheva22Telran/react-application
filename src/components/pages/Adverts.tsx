import { Box, Modal} from "@mui/material"
import { useState,  useRef, useMemo } from "react";

import { DataGrid, GridActionsCellItem, GridColDef } from "@mui/x-data-grid";

import { Delete,  Edit,  Visibility,  } from "@mui/icons-material";
import { Confirmation } from "../common/Confirmation";
import InputResult from "../../model/InputResult";
import { useDispatchCode, useSelectorAdverts} from "../../hooks/hooks";
import AdCard from "../cards/AdCard";
import { advertsService } from "../../config/service-config";
import Advert from "../../model/Advert";
import AdvertForm from "../forms/AdvertForm";



const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const Adverts: React.FC = () => {
    const columnsCommon: GridColDef[] = [
        {
            field: 'id', headerName: 'ID', flex: 0.5, headerClassName: 'data-grid-header',
            align: 'center', headerAlign: 'center'
        },
        {
            field: 'name', headerName: 'Name', flex: 0.7, headerClassName: 'data-grid-header',
            align: 'center', headerAlign: 'center'
        },
        {
            field: 'category', headerName: "Category", flex: 0.8,  headerClassName: 'data-grid-header',
            align: 'center', headerAlign: 'center'
        },
        {
            field: 'price', headerName: "Price", flex: 0.8,  headerClassName: 'data-grid-header',
            align: 'center', headerAlign: 'center'
        },
        {
            field: 'actions', type: "actions", getActions: (params) => {
                return [
                    <GridActionsCellItem label="remove" icon={<Delete />}
                        onClick={() => removeAdvert(params.id)
                        } />,
                    <GridActionsCellItem label="update" icon={<Edit />}
                        onClick={() => {
                            adId.current = params.id as any;
                            if (params.row) {
                                const ad = params.row;
                                ad && (advert.current = ad);
                                setFlEdit(true)
                            }

                        }
                        } />,
                    <GridActionsCellItem label="details" icon={<Visibility />}
                        onClick={() => {
                            adId.current = params.id as any;
                            if (params.row) {
                                const ad = params.row;
                                ad && (advert.current = ad);
                                setFlDetails(true)
                            }

                        }
                        } />
                ];
            }
        }

    ];

    const dispatch = useDispatchCode();
    const adverts: Advert[] = useSelectorAdverts()
    const columns = useMemo(() => getColumns(), [adverts]);

    const [openConfirm, setOpenConfirm] = useState(false);
    const [openEdit, setFlEdit] = useState(false);
    const [openDetails, setFlDetails] = useState(false);
    const title = useRef('');
    const content = useRef('');
    const adId = useRef('');
    const confirmFn = useRef<any>(null);
    const advert = useRef<Advert| undefined>();


    function getColumns(): GridColDef[] {

        return  columnsCommon;
    }
    
    function removeAdvert(id: any) {
        title.current = "Remove Advert?";
        const ad = adverts.find(a => (a as any).id == id);
        content.current = `You are going remove advert with id ${(ad as any)?.id}`;
        adId.current = id;
        confirmFn.current = actualRemove;
        setOpenConfirm(true);
    }
    async function actualRemove(isOk: boolean) {
        let errorMessage: string = '';
        if (isOk) {
            try {
                await advertsService.deleteAdvert(adId.current);
            } catch (error: any) {
                errorMessage = error;
            }
        }
        dispatch(errorMessage, '');
        setOpenConfirm(false);
    }
    function updateAdvert(ad: Advert): Promise<InputResult> {
        setFlEdit(false)
        const res: InputResult = { status: 'error', message: '' };
        if (JSON.stringify(advert.current) != JSON.stringify(ad)) {
            title.current = "Update Advert ?";
            advert.current = ad;
            content.current = `You are going update advert with id ${ad?.id}`;
            confirmFn.current = actualUpdate;
            setOpenConfirm(true);
        }
        return Promise.resolve(res);
    }
    async function actualUpdate(isOk: boolean) {

        let errorMessage: string = '';

        if (isOk) {
            try {
                await advertsService.updateAdvert(advert.current!);
            } catch (error: any) {
                errorMessage = error
            }
        }
        dispatch(errorMessage, '');
        setOpenConfirm(false);

    }
   

    return <Box sx={{
        display: 'flex', justifyContent: 'center',
        alignContent: 'center'
    }}>
        <Box sx={{ height: '80vh', width: '95vw' }}>
            <DataGrid columns={columns} rows={adverts} />
        </Box>
        <Confirmation confirmFn={confirmFn.current} open={openConfirm}
            title={title.current} content={content.current}></Confirmation>
        <Modal
            open={openEdit}
            onClose={() => setFlEdit(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <AdvertForm submitFn={updateAdvert}  />
            </Box>
        </Modal>
        <Modal
            open={openDetails}
            onClose={() => setFlDetails(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <AdCard advert={advert.current}/>
            </Box>
        </Modal>


    </Box>
}
export default Adverts;