import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    maxWidth: '90vw', // Set maximum width to 90% of viewport width
    maxHeight: '90vh', // Set maximum height to 90% of viewport height
    overflowY: 'auto', // Enable vertical scrolling
    bgcolor: '#2c2d4c',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function AvatarModal({ handleClose, setUser, user, open }) {
    const [activeTab, setActiveTab] = useState('all');
    const [avatars, setAvatars] = useState({
        all: [],
        male: [],
        female: []
    });

    const tabStyle = {
        backgroundColor: '#2c2d4c',
        color: '#ffffff',
        padding: '10px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    };

    const activeTabStyle = {
        ...tabStyle,
        backgroundColor: '#0d0e23',
    };

    const contentStyle = {
        marginTop: '20px',
        padding: '15px',
        backgroundColor: "rgb(14 11 39)",
        borderRadius: '5px',
        overflowY: 'auto'
    };

    const fetchAvatar = async () => {
        const response = await fetch("https://avatar.iran.liara.run/api");
        const data = await response.json();
        const allAvatars = data.all;
        const boyAvatars = data.boy;
        const girlAvatars = data.girl;
        setAvatars({ all: allAvatars, boy: boyAvatars, girl: girlAvatars });
    }

    useEffect(() => {
        fetchAvatar();
    }, []);

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const handleSelect = (avatar) => {
        var duser = user;
        duser.image = 'https://avatar.iran.liara.run' + avatar
        setUser(duser)
        handleClose()
    }

    const Avatars = ({ avatar, index }) => {
        return (
            <span key={index} onClick={() => handleSelect(avatar)} style={{ cursor: 'pointer' }}>
                <img src={`https://avatar.iran.liara.run${avatar}`} alt={`Avatar ${index}`} className='avatar-image' />
            </span>
        )
    }
    return (
        <Modal
            keepMounted
            open={open}
            onClose={handleClose}
            aria-labelledby="keep-mounted-modal-title"
            aria-describedby="keep-mounted-modal-description"
        >
            <Box sx={style}>
                <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
                    Select an Avatar
                </Typography>
                <div >
                    <div>
                        <button style={activeTab === 'all' ? activeTabStyle : tabStyle} onClick={() => handleTabClick('all')}>All</button>
                        <button style={activeTab === 'boy' ? activeTabStyle : tabStyle} onClick={() => handleTabClick('boy')}>Boy</button>
                        <button style={activeTab === 'girl' ? activeTabStyle : tabStyle} onClick={() => handleTabClick('girl')}>Girl</button>
                    </div>
                    <div style={{ ...contentStyle, maxHeight: 'calc(90vh - 150px)' }}>
                        {activeTab === 'all' && (
                            <div style={{
                                overflowY: 'auto'
                            }}>
                                {avatars.all.map((avatar, index) => (
                                    <Avatars index={index} avatar={avatar} />
                                ))}
                            </div>
                        )}
                        {activeTab === 'boy' && (
                            <div>
                                {avatars.boy.map((avatar, index) => (
                                    <Avatars index={index} avatar={avatar} />

                                ))}
                            </div>
                        )}
                        {activeTab === 'girl' && (
                            <div>
                                {avatars.girl.map((avatar, index) => (
                                    <Avatars index={index} avatar={avatar} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </Box>
        </Modal>
    );
}
