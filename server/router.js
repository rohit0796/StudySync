const express = require("express")
const router = express.Router()
const schema = require('./Models/dbschema')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const multer = require('multer')
// const fs = require('fs')
var ObjectId = require('mongodb').ObjectID;
// const Storage = multer.diskStorage({
//     destination: 'uploads',
//     filename: (req, file, cb) => {
//         cb(null, file.originalname)
//     }
// })
// const upload = multer({
//     storage: Storage
// })
router.post('/register', async (req, res) => {
    const { name, email, redgno, mob, dob, password, branch, gender, image } = req.body;
    try {
        // const imagePath = req.file.path;
        const email_user = await schema.findOne({ email: email })
        if (email_user) {
            res.status(422).json({ error: 'Email Already Exists try Logging In' });
        }
        const user = new schema({
            name,
            email,
            redgno,
            mob,
            dob,
            image,
            password,
            branch,
            gender
        });

        await user.save();
        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.get('/submit', async (req, res) => {
    const token = req.headers['x-access-token']
    try {
        const decode = jwt.verify(token, 'secret123')
        const email = decode.email
        const user = await schema.findOne({ email: email })
        res.json({ status: 'ok', user: user })
    } catch (error) {
        console.log(error)
        res.json({ status: 'error', error: 'Invalid Token' })
    }
})
router.post('/submit/delete', async (req, res) => {
    const id = req.body.id;
    // console.log(id)
    await schema.findByIdAndDelete(id).then(data => {
        console.log("deleted")
    }).catch(err => {
        console.log(err)
    })

})
router.get('/submit/update/:id', async (req, res) => {
    // console.log(req.params.id)
    await schema.findOne({ "_id": new ObjectId(req.params.id) }).then(data => res.send(data));


})

router.post('/submit/updates', async (req, res) => {
    try {
        const { name, email, redgno, mob, dob, password, branch, hobbies, gender, image } = req.body;

        const us = {
            name,
            email,
            redgno,
            mob,
            dob,
            image,
            password,
            branch,
            hobbies,
            gender
        };

        const token = req.headers['x-access-token'];

        try {
            const decode = jwt.verify(token, 'secret123');
            const userEmail = decode.email;
            const user = await schema.findOne({ email: userEmail });

            await schema.findByIdAndUpdate(user._id, us);
            res.json({ status: 'ok', data: user });
        } catch (error) {
            console.log(error);
            res.json({ status: 'error', error: 'Invalid Token' });
        }
    } catch (error) {
        console.log(error);
        res.json({ status: 'error', error: 'File upload error' });
    }

});


router.post('/login', async (req, res) => {
    const user = await schema.findOne({
        email: req.body.email,
        password: req.body.password
    })
    if (user) {
        const token = jwt.sign({
            name: user.name,
            email: user.email
        }, 'secret123')
        res.json({ status: 'ok', user: token })
    }
    else {
        res.json({ status: 'error', user: false })
    }
})

// router.post('/upload', (req, res) => {
//     upload(req, res, (err) => {
//         if (err) { console.log(err) }
//         else {
//             const newImage = new ImageModel({
//                 name: req.body.name
//             })
//             newImage.save()
//                 .then(() => res.send("Successfully uploaded"))
//                 .catch((err) => console.log(err))
//         }
//     })
// })

router.post('/add-event', async (req, res) => {
    const token = req.headers['x-access-token'];
    const { title, start, end } = req.body;

    try {
        const decode = jwt.verify(token, 'secret123');
        const email = decode.email;

        const user = await schema.findOne({ email: email });

        user.events.push({ title, start, end });

        await user.save();

        res.json({ status: 'ok', user: user });
    } catch (error) {
        console.log(error);
        res.json({ status: 'error', error: 'Invalid Token' });
    }
});

router.post('/delete-event', async (req, res) => {
    const token = req.headers['x-access-token'];
    try {
        console.log(req.body)
        const decode = jwt.verify(token, 'secret123');
        const email = decode.email;
        const user = await schema.findOneAndUpdate({ email: email }, { $set: { events: req.body } }, { new: true });
        res.json({ status: 'ok', user: user });
    } catch (error) {
        console.log(error);
        res.json({ status: 'error', error: 'Invalid Token' });
    }
});


router.post('/add-todo', async (req, res) => {
    const token = req.headers['x-access-token'];

    try {
        const decoded = jwt.verify(token, 'secret123');
        const userEmail = decoded.email;
        const user = await schema.findOne({ email: userEmail });
        if (!user) {
            return res.json({ status: 'error', message: 'User not found' });
        }
        const newTodo = {
            title: req.body.title,
            completed: req.body.completed,
        };
        user.todos.push(newTodo);
        await user.save();

        res.json({ status: 'ok', message: 'Todo added successfully' });
    } catch (error) {
        console.log(error);
        res.json({ status: 'error', message: 'Invalid Token' });
    }
});
router.post('/add-notes', async (req, res) => {
    const token = req.headers['x-access-token'];

    try {
        const decoded = jwt.verify(token, 'secret123');
        const userEmail = decoded.email;
        const user = await schema.findOne({ email: userEmail });
        if (!user) {
            return res.json({ status: 'error', message: 'User not found' });
        }
        const newTodo = {
            title: req.body.title,
            desc: req.body.desc,
        };
        user.notes.push(newTodo);
        await user.save();

        res.json({ status: 'ok', message: 'Note added successfully' });
    } catch (error) {
        console.log(error);
        res.json({ status: 'error', message: 'Invalid Token' });
    }
});
router.post('/add-subject', async (req, res) => {
    const token = req.headers['x-access-token'];

    try {
        const decoded = jwt.verify(token, 'secret123');
        const userEmail = decoded.email;
        const user = await schema.findOne({ email: userEmail });
        if (!user) {
            return res.json({ status: 'error', message: 'User not found' });
        }
        const newTodo = req.body;
        user.subjects.push(newTodo);
        await user.save();

        res.json({ status: 'ok', message: 'Note added successfully', data: user });
    } catch (error) {
        console.log(error);
        res.json({ status: 'error', message: 'Invalid Token' });
    }
});

router.get('/todo', async (req, res) => {
    const token = req.headers['x-access-token'];

    try {
        const decoded = jwt.verify(token, 'secret123');
        const userEmail = decoded.email;
        const user = await schema.findOne({ email: userEmail });
        if (user) {
            res.json({ status: 'ok', data: user });
        }
        else {
            res.json({ status: 'error', data: false })
        }
    }
    catch (err) {
        console.log(err)
    }
})


router.post('/todoupdate', async (req, res) => {
    const token = req.headers['x-access-token'];
    try {
        const decoded = jwt.verify(token, 'secret123');
        const email = decoded.email;
        const user = await schema.findOneAndUpdate({ email: email }, { $set: { todos: req.body } }, { new: true });
        if (user) {
            res.json({ status: 'ok', data: user });
        }
        else {
            res.json({ status: 'error', data: false })
        }
    }
    catch (err) {
        console.log(err)
    }
})
router.post('/subupdate', async (req, res) => {
    const token = req.headers['x-access-token'];
    try {
        const decoded = jwt.verify(token, 'secret123');
        const email = decoded.email;
        const user = await schema.findOneAndUpdate({ email: email }, { $set: { subjects: req.body } }, { new: true });
        if (user) {
            res.json({ status: 'ok', data: user });
        }
        else {
            res.json({ status: 'error', data: false })
        }
    }
    catch (err) {
        console.log(err)
    }
})
router.post('/update-notes', async (req, res) => {
    const token = req.headers['x-access-token'];
    try {
        const decoded = jwt.verify(token, 'secret123');
        const email = decoded.email;
        const user = await schema.findOneAndUpdate({ email: email }, { $set: { notes: req.body } }, { new: true });
        if (user) {
            res.json({ status: 'ok', data: user });
        }
        else {
            res.json({ status: 'error', data: false })
        }
    }
    catch (err) {
        console.log(err)
    }
})

router.post('/attendance', async (req, res) => {
    const token = req.headers['x-access-token'];
    try {
        var { subjectName, date, status } = req.body;
        date = new Date(date)
        const decoded = jwt.verify(token, 'secret123');
        const email = decoded.email;
        const user = await schema.findOne({ email: email });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const subject = user.subjects.find((subj) => subj.name === subjectName);

        if (!subject) {
            return res.status(404).json({ error: 'Subject not found' });
        }
        const pre = subject.attendance.find((obj) => obj.date.toDateString() == date.toDateString())
        if (pre) {
            console.log('same')
            subject.attendance.forEach((obj) => {
                if (obj.date.toDateString() == date.toDateString())
                    obj.status = status
            })
        }
        else
            subject.attendance.push({ date, status })

        await user.save();

        res.json({ status: 'ok' });
    } catch (error) {
        console.error('Error recording attendance:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;     