'use client';
import { Context } from '@/redux/context';
import { Avatar, List, ListItemAvatar, ListItemButton, ListItemIcon, ListItemText, ListSubheader, SwipeableDrawer } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
import '../../styles/drawer.scss';
import LogoutAction from './LogoutAction';
import AddBoxIcon from '@mui/icons-material/AddBox';
import AvatarAction from './AvatarAction';
import cookies from 'js-cookie';
import { useRouter } from 'next/navigation';



const DrawerMenu = () => {

    const [state, dispatch] = useContext(Context);
    const router = useRouter();

    const [fullName, setFullname] = useState('');

    useEffect(() => {
        setFullname(cookies.get('full_name') as string)
    }, [])

    const toggleDrawer = (open: boolean) =>
        (event: React.KeyboardEvent | React.MouseEvent) => {
            if (
                event &&
                event.type === 'keydown' &&
                ((event as React.KeyboardEvent).key === 'Tab' ||
                    (event as React.KeyboardEvent).key === 'Shift')
            ) {
                return;
            }

            dispatch({
                type: 'toggleMenu',
                payload: open,
            });
        };

    const handleClickMe = () => {
        dispatch({
            type: 'toggleMenu',
            payload: false,
        })
        router.push(`/home/${fullName}`);
    }

    const handleLogout = () => {
        cookies.remove('c_user');
        cookies.remove('full_name');
        cookies.remove('avatar');
        window.location.reload();
    }

    const handleClickCreate = () => {
        dispatch({
            type: 'toggleMenu',
            payload: false,
        })
        router.push(`/home/pin-create-tool`);
    }

    return (
        <SwipeableDrawer
            anchor={'right'}
            open={state.menu}
            onClose={toggleDrawer(false)}
            onOpen={toggleDrawer(true)}
            className='custom-drawer'
        >
            <List
                sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                        Account
                    </ListSubheader>
                }
            >
                <ListItemButton onClick={handleClickMe}>
                    <ListItemAvatar>
                        <AvatarAction />
                    </ListItemAvatar>
                    <ListItemText primary={fullName} />
                </ListItemButton>
            </List>
            <List
                sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                        More options
                    </ListSubheader>
                }
            >
                <ListItemButton onClick={handleClickCreate}>
                    <ListItemIcon>
                        <AddBoxIcon />
                    </ListItemIcon>
                    <ListItemText primary="Create" />
                </ListItemButton>
                <ListItemButton onClick={handleLogout}>
                    <ListItemIcon>
                        <LogoutAction />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                </ListItemButton>

            </List>
        </SwipeableDrawer>
    )
}

export default DrawerMenu