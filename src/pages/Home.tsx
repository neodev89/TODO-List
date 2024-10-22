import { Box, Stack, Typography } from "@mui/material"
import styleHome from '../sass/homeStyle.module.sass';
import { ListItems } from "../widgets/ListItems";

export default function Home() {
    const { home, centralStack, boxTitle, boxList, titleList } = styleHome;

    return (
        <Box component={'div'} className={home}>
            <Stack spacing={2} className={centralStack}>
                <Box component={'div'} className={boxTitle}>
                    <Typography variant={'h3'} className={titleList}>TODO List</Typography>
                </Box>
                <Box component={'div'} className={boxList}>
                    <ListItems />
                </Box>
            </Stack>
        </Box>
    );
}
