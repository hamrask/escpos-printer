const receipt = require('receipt');
receipt.config.currency = '';// The currency symbol to use in output.
receipt.config.width = 55;     // The amount of characters used to give the output a "width".
receipt.config.ruler = '=';    // The character used for ruler output.

generateBill = (orderNumber,billDate, items,userName,Total,printerIp,billHeader,billSubHeader1,billSubHeader2 ) =>{ 
const firstPart = receipt.create([
    /*{ type: 'text', value: [       
        'Near Madeena Palli,   Chelakkad','  Mob:7898451355,8794561230'        
    ], align: 'center' },*/
    { type: 'empty' },
    { type: 'properties',align:'left', lines: [
        { name: 'Order Number', value: orderNumber },
        { name: 'Date', value: billDate, align:'right'},
    ] }
]);
const secondPart = receipt.create([

   
    { type: 'table', lines: items },
    { type: 'empty' },
    {type: 'text', value:'User: '+userName, align:'left'},
    { type: 'text', value:'Total =  '+Total, align: 'right' },
    
    { type: 'empty' },/*
    { type: 'properties', lines: [
        { name: 'GST (10.00%)', value: 'AUD XX.XX' },
        { name: 'Total amount (excl. GST)', value: 'AUD XX.XX' },
        { name: 'Total amount (incl. GST)', value: 'AUD XX.XX' }
    ] },
    { type: 'empty' },
    { type: 'properties', lines: [
        { name: 'Amount Received', value: 'AUD XX.XX' },
        { name: 'Amount Returned', value: 'AUD XX.XX' }
    ] },*/
    { type: 'empty' },
    { type: 'text', value: 'Thank you...', align: 'center', padding: 5 }
]);


const escpos = require('escpos');
escpos.Network = require('escpos-network');


const printerDevice = new escpos.Network(printerIp);
const printer = new escpos.Printer(printerDevice);


printerDevice.open(function(error){
    printer
        .font('B')
        
        .align("CT").style('B2').size(1,1).text(billHeader).control('VT').feed().control('CR')
        .style('NORMAL')
        .size('1')
        .align('CT').text(billSubHeader1).control('CR')
        .align('CT').text(billSubHeader2)
        .align('LT')  
        .size(1)        
        .text(firstPart)
        .align('CT')
        .text(secondPart).encode()
        
        

    printer.feed();
    printer.feed();
    printer.beep(5,100);
    printer.close();
});
}

generateBill(
    '1234',
    '12/9/21',
    [{ item: 'Product 1', qty: 1, cost: 1000 },
    { item: 'Product 2 with a really long name', qty: 1, cost: 17500},
    { item: 'Another product wth quite a name', qty: 2, cost: 900 },
    { item: 'Product 4', qty: 1, cost: 80  },
    { item: 'This length is ridiculously lengthy', qty: 14, cost: 8516 },
    { item: 'Product 6', qty: 3, cost: 500 },
    { item: 'Product 7', qty: 3, cost: 500 }],
    'Fuad',
    '1000.00',
    '192.168.0.17',
    'TABLE 123',
    '',
    ''
    /*
    'near Madeena Masjid, Chelakkad',
    'MOb:789456123, 123456789'*/
);