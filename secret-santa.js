// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set region
AWS.config.update({ region: 'us-west-2' });

var people = [{
    name: 'Haniye',
    phone: '+61 450 008 586'
}, {
    name: 'Poya',
    phone: '+61 466 269 356'
}, {
    name: 'Sanaz',
    phone: '+61 424 409 911'
}, {
    name: 'Ali Tahori',
    phone: '+61 490 047 859'
}, {
    name: 'A.Sabaghi',
    phone: '+61 423 884 896'
}, {
    name: 'Elham',
    phone: '+61 478 753 265'
}, {
    name: 'Elnaz',
    phone: '+61 478 553 131'
}, {
    name: 'Mahsa',
    phone: '+61 466 266 804'
}, {
    name: 'Melika',
    phone: '+61 402 536 320'
}, {
    name: 'Siavash',
    phone: '+61 401 198 808'
}, {
    name: 'Masih',
    phone: '+61 457 080 904'
}, {
    name: 'Sadegh',
    phone: '+61 434 495 596'
}, {
    name: 'A.Asadi',
    phone: '+61 468 783 131'
},
{
    name: 'Atiye',
    phone: '+61 424 869 900'
},
];


var pair = function (arr) {
    var result = [];
    var recipients = arr.slice();
    var len = arr.length;
    for (var i = 0; i < len; i++) {
        var sender = arr[i];
        var recipientIndex = Math.floor(Math.random() * recipients.length);
        while (recipients[recipientIndex].name === sender.name) {
            // Can't send gift to myself
            recipientIndex = Math.floor(Math.random() * recipients.length);
        }
        var recipient = recipients.splice(recipientIndex, 1)[0];
        result.push({
            sender: sender,
            receiver: recipient
        });
    }
    return result;
};

var sendSMS = async (from, to) => {
    // Create publish parameters
    var params = {
        Message: `Yoo-hoo! You are the secret Santa for ${to.name}. Surprize your friend by a nice gift!`, /* required */
        PhoneNumber: from.phone.replace(/\s/g, ''),
    };
    console.log('>>>>params', params);

    await new AWS.SNS({ apiVersion: '2010-03-31' }).setSMSAttributes({
        attributes: {
            'DefaultSenderID': 'SnapSwap'
        }
    }).promise();

    const data = await new AWS.SNS({ apiVersion: '2010-03-31' }).publish(params).promise();
    console.log("MessageID is " + data.MessageId);
}



const list = [
    {
        Message: 'Yoo-hoo! You are the secret Santa for Elnaz. Surprize your friend by a nice gift!',
        PhoneNumber: '+61450008586'
    },
    {
        Message: 'Yoo-hoo! You are the secret Santa for Elham. Surprize your friend by a nice gift!',
        PhoneNumber: '+61466269356'
    },
    {
        Message: 'Yoo-hoo! You are the secret Santa for Melika. Surprize your friend by a nice gift!',
        PhoneNumber: '+61424409911'
    }
    ,
    {
        Message: 'Yoo-hoo! You are the secret Santa for Sanaz. Surprize your friend by a nice gift!',
        PhoneNumber: '+61490047859'
    }
    , {
        Message: 'Yoo-hoo! You are the secret Santa for Poya. Surprize your friend by a nice gift!',
        PhoneNumber: '+61423884896'
    }
    , {
        Message: 'Yoo-hoo! You are the secret Santa for A.Asadi. Surprize your friend by a nice gift!',
        PhoneNumber: '+61478753265'
    }
    , {
        Message: 'Yoo-hoo! You are the secret Santa for Masih. Surprize your friend by a nice gift!',
        PhoneNumber: '+61478553131'
    }
    , {
        Message: 'Yoo-hoo! You are the secret Santa for Haniye. Surprize your friend by a nice gift!',
        PhoneNumber: '+61466266804'
    }
    , {
        Message: 'Yoo-hoo! You are the secret Santa for Mahsa. Surprize your friend by a nice gift!',
        PhoneNumber: '+61402536320'
    }
    , {
        Message: 'Yoo-hoo! You are the secret Santa for Ali Tahori. Surprize your friend by a nice gift!',
        PhoneNumber: '+61401198808'
    }
    , {
        Message: 'Yoo-hoo! You are the secret Santa for Atiye. Surprize your friend by a nice gift!',
        PhoneNumber: '+61457080904'
    }
    ,
    {
        Message: 'Yoo-hoo! You are the secret Santa for A.Sabaghi. Surprize your friend by a nice gift!',
        PhoneNumber: '+61434495596'
    }
    , {
        Message: 'Yoo-hoo! You are the secret Santa for Sadegh. Surprize your friend by a nice gift!',
        PhoneNumber: '+61468783131'
    },
    {
        Message: 'Yoo-hoo! You are the secret Santa for Siavash. Surprize your friend by a nice gift!',
        PhoneNumber: '+61424869900'
    }
]
const wait = (timeout) => new Promise((resolve) => setTimeout(resolve, timeout));


const init = async () => {
    for (const item of list) {
        console.log('>>>>>', item);

        await new AWS.SNS({ apiVersion: '2010-03-31' }).setSMSAttributes({
            attributes: {
                'DefaultSenderID': 'SnapSwap'
            }
        }).promise();

        const data = await new AWS.SNS({ apiVersion: '2010-03-31' }).publish(item).promise();
        await wait(1000);
        console.log("MessageID is " + data.MessageId);
    }
    
    const result = pair(people);
    for (const item of result) {
        // if (item.sender.name === 'Alireza Asadi')
        sendSMS(item.sender, item.receiver);
        console.log('Sent to ' + item.sender.name);
    }

}

module.exports = init;
