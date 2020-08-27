const test = require('ava');
const {
    statement
} = require('../src/statement');

test('Yancy test case1 : Yancy has one performance hamlet and the audience is 55', t => {
    //given
    const invoice = {
        'customer': 'Yancy',
        'performances': [{
            'playID': 'hamlet',
            'audience': 55,
        }, ]
    }

    //when
    const result = statement(invoice, plays);

    //then
    t.is(result,
        "Statement for Yancy\n" +
        " Hamlet: $650.00 (55 seats)\n" +
        "Amount owed is $650.00\n" +
        "You earned 25 credits \n"
    );
});

test('Yancy test case2 : Yancy has one performance as-like  and the audience is 25', t => {
    //given
    const invoice = {
        'customer': 'Yancy',
        'performances': [{
            'playID': 'as-like',
            'audience': 25,
        }, ]
    }

    //when
    const result = statement(invoice, plays);

    //then
    t.is(result, `Statement for Yancy
 As You Like It: $500.00 (25 seats)
Amount owed is $500.00
You earned 5 credits 
`);
});

test('Yancy test case3 : Yancy has one performance OOCL which no play tpye', t => {
    //given
    const invoice = {
        'customer': 'Yancy',
        'performances': [{
            'playID': 'OOCL',
            'audience': 25,
        }, ]
    }

    const plays = {
        'OOCL': {
            'name': 'OOCL',
            'type': 'tragedy1',
        },
    };

    try {
        // when
        statement(invoice, plays);
        t.fail();
    } catch (e) {
        //then
        t.is(e.message, 'unknown type: tragedy1')
    }

});


//Sample
const invoice = {
    'customer': 'BigCo',
    'performances': [{
            'playID': 'hamlet',
            'audience': 55,
        },
        {
            'playID': 'as-like',
            'audience': 35,
        },
        {
            'playID': 'othello',
            'audience': 40,
        },
    ],
};


const plays = {
    'hamlet': {
        'name': 'Hamlet',
        'type': 'tragedy',
    },
    'as-like': {
        'name': 'As You Like It',
        'type': 'comedy',
    },
    'othello': {
        'name': 'Othello',
        'type': 'tragedy',
    },
};