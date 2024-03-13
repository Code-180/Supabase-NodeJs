//++++++++++++++++++++++++++++++++++++++++++
//Import
//++++++++++++++++++++++++++++++++++++++++++
const os = require("os");
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
var { createClient } = require("@supabase/supabase-js");
//++++++++++++++++++++++++++++++++++++++++++
const supabase = createClient(process.env.SUPABASEURL, process.env.SUPABASEKEY);
//++++++++++++++++++++++++++++++++++++++++++
const app = express();
//++++++++++++++++++++++++++++++++++++++++++
app.use(bodyParser.json());
//++++++++++++++++++++++++++++++++++++++++++
//List
//++++++++++++++++++++++++++++++++++++++++++
app.get('/list', async (req, res) => {
    let resData = {
        status: false,
        r: {},
        message: 'N/A'
    }
    try {
        //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        //Blog ALL ROWS
        //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        let blog = await supabase.from('blog').select('*');
        resData.r.all = blog;
        //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        //Blog All ROWS With Selected Coloums
        //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        let blogSelcted = await supabase.from('blog').select('blog_title,blog_description');
        resData.r.selected = blogSelcted;
        //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        //Blog With Pagination
        //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        let blogPaginated = await supabase.from('blog').select('*').range(0, 9);
        resData.r.pagination = blogPaginated;
        //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        resData.status = true;
        resData.message = "Success...";
        return res.status(601).json(resData);
        //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    } catch (e) {
        //+++++++++++++++++++++++++++++++
        console.log(e);
        //+++++++++++++++++++++++++++++++
        resData.status = false;
        resData.message = e.message;
        return res.status(601).json(resData);
    }
});
//++++++++++++++++++++++++++++++++++++++++++
//Create
//++++++++++++++++++++++++++++++++++++++++++
app.post('/create', async (req, res) => {
    let resData = {
        status: false,
        r: {},
        message: 'N/A'
    }
    try {
        //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        const insertReturn = await supabase.from('blog').insert([
            { blog_title: req.body.title, blog_description: req.body.descrption, blog_tags: req.body.tags },
        ]).select();
        //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        resData.r.insert = insertReturn;
        resData.r.error = insertReturn.error;
        //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        resData.status = true;
        resData.message = "Success...";
        return res.status(601).json(resData);

    } catch (e) {
        //+++++++++++++++++++++++++++++++
        console.log(e);
        //+++++++++++++++++++++++++++++++
        resData.status = false;
        resData.message = e.message;
        return res.status(601).json(resData);
    }
});
//++++++++++++++++++++++++++++++++++++++++++
//Create Mutiple Formate
//++++++++++++++++++++++++++++++++++++++++++
app.post('/createMutiple', async (req, res) => {
    let resData = {
        status: false,
        r: {},
        message: 'N/A'
    }
    try {
        //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        const insertReturn = await supabase.from('blog').insert([
            { blog_title: 'Test Blog Mutiple 01', blog_description: 'Description-1', blog_tags: "Tags1,Tags2" },
            { blog_title: 'Test Blog Mutiple 02', blog_description: 'Description-2', blog_tags: "Tags3,Tags4" },
        ]).select();
        //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        resData.r.insert = insertReturn;
        resData.r.error = insertReturn.error;
        //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        resData.status = true;
        resData.message = "Success...";
        return res.status(601).json(resData);

    } catch (e) {
        //+++++++++++++++++++++++++++++++
        console.log(e);
        //+++++++++++++++++++++++++++++++
        resData.status = false;
        resData.message = e.message;
        return res.status(601).json(resData);
    }
});
//++++++++++++++++++++++++++++++++++++++++++
//Update
//++++++++++++++++++++++++++++++++++++++++++
app.post('/update', async (req, res) => {
    let resData = {
        status: false,
        r: {},
        message: 'N/A'
    }
    try {
        //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        const updateReturn = await supabase.from('blog')
            .update({ blog_title: req.body.title, blog_description: req.body.descrption, blog_tags: req.body.tags })
            .eq('id', req.body.id)
            .select();
        //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        resData.r.update = updateReturn;
        resData.r.error = updateReturn.error;
        //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        resData.status = true;
        resData.message = "Success...";
        return res.status(601).json(resData);
    } catch (e) {
        //+++++++++++++++++++++++++++++++
        console.log(e);
        //+++++++++++++++++++++++++++++++
        resData.status = false;
        resData.message = e.message;
        return res.status(601).json(resData);
    }
});

//++++++++++++++++++++++++++++++++++++++++++
//Single
//++++++++++++++++++++++++++++++++++++++++++
app.get('/single', async (req, res) => {
    let resData = {
        status: false,
        r: {},
        message: 'N/A'
    }
    try {
        const singleData = await supabase.from('blog').select('*').eq('id', req.query.id);
        //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        resData.r.single = singleData;
        resData.r.error = singleData.error;
        //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        resData.status = true;
        resData.message = "Success...";
        return res.status(601).json(resData);
    } catch (e) {
        //+++++++++++++++++++++++++++++++
        console.log(e);
        //+++++++++++++++++++++++++++++++
        resData.status = false;
        resData.message = e.message;
        return res.status(601).json(resData);
    }
});
//++++++++++++++++++++++++++++++++++++++++++
//Delete
//++++++++++++++++++++++++++++++++++++++++++
app.delete('/delete', async (req, res) => {
    let resData = {
        status: false,
        r: {},
        message: 'N/A'
    }
    try {
        const error = await supabase.from('blog').delete().eq('id', req.query.id);
        //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        resData.r.error = error;
        //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        resData.status = true;
        resData.message = "Success...";
        return res.status(601).json(resData);
    } catch (e) {
        //+++++++++++++++++++++++++++++++
        console.log(e);
        //+++++++++++++++++++++++++++++++
        resData.status = false;
        resData.message = e.message;
        return res.status(601).json(resData);
    }
});
//++++++++++++++++++++++++++++++++++++++++++
//Fliter Sample
//++++++++++++++++++++++++++++++++++++++++++
app.get('/filter', async (req, res) => {
    let resData = {
        status: false,
        r: {},
        message: 'N/A'
    }
    try {
        //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        //ALL KIND OF FILTER
        //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        let { data: blog, error } = await supabase
            .from('blog')
            .select("*")
            .eq('column', 'Equal to')
            .gt('column', 'Greater than')
            .lt('column', 'Less than')
            .gte('column', 'Greater than or equal to')
            .lte('column', 'Less than or equal to')
            .like('column', '%CaseSensitive%')
            .ilike('column', '%CaseInsensitive%')
            .is('column', null)
            .in('column', ['Array', 'Values'])
            .neq('column', 'Not equal to')
            .contains('array_column', ['array', 'contains'])
            .containedBy('array_column', ['contained', 'by'])
    } catch (e) {
        //+++++++++++++++++++++++++++++++
        console.log(e);
        //+++++++++++++++++++++++++++++++
        resData.status = false;
        resData.message = e.message;
        return res.status(601).json(resData);
    }
});
//++++++++++++++++++++++++++++++++++++++++++
//Server
//++++++++++++++++++++++++++++++++++++++++++
const PORT = process.env.PORT || 8612;
//++++++++++++++++++++++++++++++++++++++++++
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});