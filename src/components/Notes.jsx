import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import './notes.css'
import url from './url';
import toast, { Toaster } from 'react-hot-toast';
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};


export default function Notes() {
  const [ind, setind] = React.useState()
  const [title, setTitle] = React.useState()
  const [desc, setDesc] = React.useState()
  const [open, setOpen] = React.useState(false);
  const [notes, setnotes] = React.useState([])

  const getData = () => {
    fetch(`${url}/todo`, {
      method: "GET",
      headers: {
        'x-access-token': localStorage.getItem('token')
      }
    }).then((dat) => dat.json()).then((val) => setnotes(val.data.notes))
  }
  React.useEffect(() => {
    getData()
  }, [])

  const handleClickOpen = (ind) => {
    setind(ind)
    setTitle(notes[ind].title)
    setDesc(notes[ind].desc)
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };


  const DeleteNote = () => {
    if (window.confirm('Sure you want to delete the Note') === true) {
      var tod = notes
      tod.splice(ind, 1)
      fetch(`${url}/update-notes`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': localStorage.getItem('token')
        },
        body: JSON.stringify(tod)
      }).then((val) => val.json()).then((val) => setnotes(tod));
      handleClose()
    }
  }


  const SendNotes = (e) => {
    e.preventDefault();
    var note = {
      title: e.target[0].value,
      desc: e.target[1].value,
    }
    e.target[0].value = ''
    e.target[1].value = ''
    try {
      fetch(`${url}/add-notes`, {
        method: 'POST',
        headers: {
          'x-access-token': localStorage.getItem('token'),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(note)
      })
        .then((dat) => dat.json())
        .then((val) => {
          if (val) {
            toast.success('Note Added')
          }
        })
    } catch (error) {
      toast.error(error)
    }
    setnotes([...notes, note])
  }



  const UpdateNote = () => {
    handleClose();
    var obj = notes;
    obj[ind].title = title;
    obj[ind].desc = desc;
    try {
      fetch(`${url}/update-notes`, {
        method: 'POST',
        headers: {
          'x-access-token': localStorage.getItem('token'),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj)
      })
        .then((dat) => dat.json())
        .then(() => {
          setnotes(obj)
          toast.success('Note Updated')

        })
    } catch (error) {
      toast.error(error)
    }
  }


  return (
    <div>
      <Toaster toastOptions={{
        style: {
          border: '1px solid white',
          padding: '16px',
          color: 'white',
          backgroundColor: '#0d0e23'
        },
      }} />
      <div className="header">
        <h1>Notes</h1>
      </div>
      <div className="notes-input">
        <form action="" onSubmit={SendNotes}>
          <div className="in">
            <input type="text" placeholder='Title...' style={{ padding: '10px' }} required />
          </div>
          <textarea cols={100} rows={6} placeholder='write Note here...' />
          <div className="form-but">
            <button type='submit'>Add</button>
          </div>
        </form>
      </div>
      <div className="notes-cont">
        {
          notes && notes.length === 0 ?
            <div style={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
              You Don't have anything here Yet
            </div> :
            notes && notes.map((note, ind) => {
              return (
                <button key={note._id} onClick={() => {
                  handleClickOpen(ind)
                }}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                  }}
                >
                  <div className="notes">
                    <strong><span>{note.title}</span></strong>
                    <p style={{ margin: '4px 0' }}>{note.desc}</p>
                  </div>
                </button>
              )
            })
        }
      </div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          <input type="text" name="" id="" onChange={(e) => setTitle(e.target.value)} value={title} style={{
            background: 'transparent',
            border: 'none',
            outline: 'none',
            fontSize: '1.2rem'
          }} />
        </BootstrapDialogTitle>
        <DialogContent >
          <textarea style={{ color: 'black', border: 'none', outline: 'none' }} value={desc} onChange={(e) => setDesc(e.target.value)} rows={10} cols={70} />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={UpdateNote}>
            Save changes
          </Button>
          <Button autoFocus onClick={DeleteNote}>
            Delete
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}