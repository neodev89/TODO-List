import { Box, Stack } from "@mui/material"
import styleHome from '../sass/homeStyle.module.sass';
import { ListItems } from "../widgets/ListItems";

export default function Home() {
    const { home, centralStack, boxTitle, boxList, titleList } = styleHome;

    return (
        <Box component={'div'} className={home}>
            <Stack spacing={2} className={centralStack}>
                <Box component={'div'} className={boxTitle}>
                    <h1 className={titleList}>TODO List</h1>
                </Box>
                <Box component={'div'} className={boxList}>
                    <ListItems />
                </Box>
            </Stack>
        </Box>
    );
}
