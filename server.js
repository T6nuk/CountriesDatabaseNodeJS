const express = require('express');
const axios = require('axios');
const ejs = require('ejs');
const app = express();

app.use(express.static('public'));

app.set('view engine', ejs);
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res)=>{
    res.render('index.ejs', {nameOfCountry: ''});
});

app.post('/countries', (req, res)=>{
    let userCountry = req.body.country;
    const url = 'https://restcountries.com/v3/name/'+userCountry+'?fullText=true';
    


    axios.get(url)
    .then((response)=>{
        let countryData = {
            countryName: '',
            countryTopLevelDomain: '',
            countryCallingCode: '',
            countryCapital: '',
            countryRegion: '',
            countrySubregion: '',
            countryLanguage: '',
            countryCurrencyCode: '',
            countryFlagURL: ''
        };
            countryData.countryName = response.data[0].name.common;
            countryData.countryTopLevelDomain = response.data[0].tld;
            countryData.countryCallingCode = response.data[0].idd.root+''+response.data[0].idd.suffixes;
            countryData.countryCapital = response.data[0].capital;
            countryData.countryRegion = response.data[0].region;
            countryData.countrySubregion = response.data[0].subregion;
            countryData.countryLanguage = response.data[0].languages.est;
            countryData.countryCurrencyCode = response.data[0].currencies.EUR.name+' '+response.data[0].currencies.EUR.symbol;
            countryData.countryFlagURL = response.data[0].flags[1];
            
            res.render('index.ejs', {nameOfCountry: countryData});

    })
    .catch((error)=>{
        console.log(error);
    });
    
});
app.listen(3000, ()=>{
    console.log('server is online');
});