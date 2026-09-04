export const curriculum = [
  {
    id: 'mql5-masterclass',
    slug: 'mql5-programming-masterclass',
    title: 'MQL5 Programming Masterclass',
    description:
      'Learn to build custom Expert Advisors and indicators from scratch. Covers OOP, backtesting, optimization, and deployment on live accounts.',
    level: 'Intermediate',
    duration: '6h 20m',
    lessonsCount: 9,
    price: 99,
    modules: [
      {
        id: 'getting-started',
        title: 'Getting started with MQL5',
        lessons: [
          {
            id: 'welcome-to-mql5',
            title: 'Welcome to MQL5',
            duration: '8 min',
            summary: 'What MQL5 is, where it runs, and how this course is structured.',
            content: [
              {
                heading: 'What you will build',
                body: 'MQL5 is the language used to write Expert Advisors, indicators, and scripts for MetaTrader 5. By the end of this course you will write, test, and think about live deployment with risk controls in mind.',
              },
              {
                heading: 'How this course works',
                body: 'Each module is a sequence of lessons. Finish the lesson, then take the quiz. You need 70% to pass. Passing unlocks the next lesson so progress is sequential and measurable.',
              },
              {
                heading: 'Keep this in mind',
                body: 'Bots do not remove risk. Position sizing, drawdown limits, and knowing when not to trade matter as much as the entry signal.',
              },
            ],
            quiz: {
              passingScore: 70,
              questions: [
                {
                  id: 'w1',
                  prompt: 'MQL5 is primarily used to write programs for which platform?',
                  options: ['MetaTrader 4', 'MetaTrader 5', 'TradingView', 'NinjaTrader'],
                  answer: 1,
                  explanation: 'MQL5 targets MetaTrader 5. MQL4 is the language for MetaTrader 4.',
                },
                {
                  id: 'w2',
                  prompt: 'What must you complete to unlock the next lesson in this course?',
                  options: [
                    'Watch a video only',
                    'Pass the end-of-lesson quiz',
                    'Purchase a bot',
                    'Message support',
                  ],
                  answer: 1,
                  explanation: 'Progress is gated by passing the lesson quiz at 70% or higher.',
                },
                {
                  id: 'w3',
                  prompt: 'Which of these is part of a risk-first approach?',
                  options: [
                    'Maxing lot size on every signal',
                    'Ignoring drawdown',
                    'Position sizing and drawdown limits',
                    'Disabling stop losses',
                  ],
                  answer: 2,
                  explanation: 'Capital protection comes first: size positions and cap drawdown.',
                },
              ],
            },
          },
          {
            id: 'dev-setup',
            title: 'Your development setup',
            duration: '12 min',
            summary: 'MetaEditor, compiling, and attaching an EA to a chart.',
            content: [
              {
                heading: 'MetaEditor',
                body: 'MetaEditor is the IDE bundled with MetaTrader 5. You write .mq5 files, compile them to .ex5, then attach the resulting program to a chart.',
              },
              {
                heading: 'A first compile',
                body: 'Create a new Expert Advisor from the wizard, compile with F7, and confirm there are no errors in the Errors tab. Warnings are worth reading even when the build succeeds.',
              },
              {
                heading: 'Attach to a chart',
                body: 'Drag the compiled EA onto a chart, allow Algo Trading, and check the Experts log. If nothing prints, AutoTrading may be disabled or the EA may have failed OnInit.',
              },
            ],
            quiz: {
              passingScore: 70,
              questions: [
                {
                  id: 'd1',
                  prompt: 'What does compiling an .mq5 file produce?',
                  options: ['.mqh header', '.ex5 executable', '.dll library', '.set file'],
                  answer: 1,
                  explanation: 'The compiler outputs an .ex5 that MetaTrader can run.',
                },
                {
                  id: 'd2',
                  prompt: 'Where should you look first if an EA does not appear to run?',
                  options: [
                    'The Strategy Tester report only',
                    'The Experts log and AutoTrading status',
                    'Windows Event Viewer',
                    'The Market Watch symbols list',
                  ],
                  answer: 1,
                  explanation: 'Init failures and disabled AutoTrading show up in the Experts log.',
                },
                {
                  id: 'd3',
                  prompt: 'What is MetaEditor used for?',
                  options: [
                    'Placing market orders only',
                    'Writing and compiling MQL5 programs',
                    'Hosting VPS servers',
                    'Charting candlesticks',
                  ],
                  answer: 1,
                  explanation: 'MetaEditor is the MQL5 IDE for source files and compilation.',
                },
              ],
            },
          },
          {
            id: 'how-markets-move',
            title: 'How markets move',
            duration: '10 min',
            summary: 'Price, timeframes, and why your bot must define a market regime.',
            content: [
              {
                heading: 'Price is a stream',
                body: 'Your EA sees ticks and bars. A strategy that looks perfect on H1 can fail on M5 because noise and spread dominate shorter timeframes.',
              },
              {
                heading: 'Trend vs range',
                body: 'Trend-following systems bleed in ranges. Mean-reversion systems get run over in trends. A professional bot either filters regime or uses rules that degrade gracefully.',
              },
              {
                heading: 'Costs are part of the signal',
                body: 'Spread, slippage, and commission eat edge. Always test with realistic costs before you trust a backtest.',
              },
            ],
            quiz: {
              passingScore: 70,
              questions: [
                {
                  id: 'm1',
                  prompt: 'Why might an H1 strategy fail on M5?',
                  options: [
                    'M5 has no spread',
                    'Shorter timeframes have more noise relative to costs',
                    'MetaTrader cannot read M5',
                    'MQL5 ignores M5 bars',
                  ],
                  answer: 1,
                  explanation: 'Noise and transaction costs are relatively larger on lower timeframes.',
                },
                {
                  id: 'm2',
                  prompt: 'A trend-following EA typically struggles when the market is:',
                  options: ['Trending strongly', 'Ranging / mean-reverting', 'Closed', 'Gapping only at open'],
                  answer: 1,
                  explanation: 'Trend systems take many false breakouts in ranges.',
                },
                {
                  id: 'm3',
                  prompt: 'Which should be included in a serious backtest?',
                  options: [
                    'Zero spread and zero slippage',
                    'Spread, slippage, and commission',
                    'Only winning trades',
                    'A single lucky week',
                  ],
                  answer: 1,
                  explanation: 'Costs are part of whether an edge exists.',
                },
              ],
            },
          },
        ],
      },
      {
        id: 'foundations',
        title: 'MQL5 foundations',
        lessons: [
          {
            id: 'variables-types',
            title: 'Variables, types & operators',
            duration: '18 min',
            summary: 'How MQL5 stores numbers, prices, and flags you will use in every EA.',
            content: [
              {
                heading: 'Core types',
                body: 'int for counts and magic numbers, double for prices and lots, bool for flags, string for symbols and comments. Pick the smallest type that is still correct.',
              },
              {
                heading: 'Inputs vs globals',
                body: 'input variables become EA parameters in the chart dialog. They are constants at runtime. Use ordinary globals for state that changes on each tick.',
              },
              {
                heading: 'Operators that bite',
                body: 'Integer division truncates. Compare doubles with a small epsilon, not ==, when you care about price equality. Assignment (=) is not comparison (==).',
              },
            ],
            quiz: {
              passingScore: 70,
              questions: [
                {
                  id: 'v1',
                  prompt: 'Which type is the usual choice for a bid/ask price?',
                  options: ['int', 'bool', 'double', 'datetime'],
                  answer: 2,
                  explanation: 'Prices are floating-point values, so double is the standard type.',
                },
                {
                  id: 'v2',
                  prompt: 'An input variable in MQL5 is:',
                  options: [
                    'Mutable on every tick',
                    'A compile-time parameter shown in the EA settings',
                    'Stored only in a CSV file',
                    'The same as a #define macro',
                  ],
                  answer: 1,
                  explanation: 'input values are set before the EA runs and stay constant.',
                },
                {
                  id: 'v3',
                  prompt: 'Why is price1 == price2 often a bad idea?',
                  options: [
                    'Doubles cannot be declared',
                    'Floating-point rounding can make exact equality fail',
                    'MQL5 forbids ==',
                    'Prices are always integers',
                  ],
                  answer: 1,
                  explanation: 'Compare with a pip/point tolerance instead of exact equality.',
                },
              ],
            },
          },
          {
            id: 'functions-control-flow',
            title: 'Functions and control flow',
            duration: '16 min',
            summary: 'OnInit, OnTick, OnDeinit, and writing small testable helpers.',
            content: [
              {
                heading: 'Lifecycle callbacks',
                body: 'OnInit runs once when the EA starts. OnTick runs on new quotes. OnDeinit runs when the EA is removed. Put setup and cleanup in the right place.',
              },
              {
                heading: 'Keep OnTick thin',
                body: 'If OnTick becomes a 400-line nest of if statements, extract helpers: ShouldEnter(), SizePosition(), PlaceOrder(). Easier to test and harder to break.',
              },
              {
                heading: 'Return early',
                body: 'Guard clauses (if (!ready) return;) beat deep nesting. Your future self will thank you when debugging a live account.',
              },
            ],
            quiz: {
              passingScore: 70,
              questions: [
                {
                  id: 'f1',
                  prompt: 'Which function runs once when the EA is attached?',
                  options: ['OnTick', 'OnInit', 'OnTrade', 'OnTimer'],
                  answer: 1,
                  explanation: 'OnInit is the initialization callback.',
                },
                {
                  id: 'f2',
                  prompt: 'A good reason to extract helpers from OnTick is:',
                  options: [
                    'To make the file longer',
                    'To keep logic testable and readable',
                    'Because MQL5 requires 12 functions',
                    'To disable compilation',
                  ],
                  answer: 1,
                  explanation: 'Small functions are easier to reason about and reuse.',
                },
                {
                  id: 'f3',
                  prompt: 'OnDeinit is the right place to:',
                  options: [
                    'Open new market orders',
                    'Clean up objects, timers, and graphical labels',
                    'Change the chart timeframe',
                    'Download tick history',
                  ],
                  answer: 1,
                  explanation: 'Use OnDeinit for teardown when the EA is removed.',
                },
              ],
            },
          },
          {
            id: 'time-series',
            title: 'Working with time series',
            duration: '20 min',
            summary: 'CopyRates, iMA handles, and reading bars without looking into the future.',
            content: [
              {
                heading: 'Bars are indexed from the present',
                body: 'In MQL5, shift 0 is the current forming bar. Shift 1 is the last closed bar. Strategies that trade on close should usually look at shift 1.',
              },
              {
                heading: 'Copy functions',
                body: 'CopyClose, CopyRates, and indicator handles (iMA, iATR) are the modern API. Check returned counts. Never assume you got the bars you asked for.',
              },
              {
                heading: 'No future peeking',
                body: 'If your backtest looks too good, you may be using bar 0 values that would not have been known at the signal time. Prefer closed-bar logic unless you know the cost of intra-bar decisions.',
              },
            ],
            quiz: {
              passingScore: 70,
              questions: [
                {
                  id: 't1',
                  prompt: 'In MQL5 time series, shift 0 usually refers to:',
                  options: [
                    'The oldest bar on the chart',
                    'The current forming bar',
                    'A weekly bar only',
                    'The account history deal',
                  ],
                  answer: 1,
                  explanation: 'Index 0 is the current bar; 1 is typically the last closed bar.',
                },
                {
                  id: 't2',
                  prompt: 'Why check the count returned by CopyClose?',
                  options: [
                    'It is optional documentation',
                    'You may receive fewer bars than requested',
                    'CopyClose never fails',
                    'It returns lot size',
                  ],
                  answer: 1,
                  explanation: 'History can be incomplete; always validate the copied count.',
                },
                {
                  id: 't3',
                  prompt: 'Trading only on the last closed bar helps avoid:',
                  options: [
                    'Spread',
                    'Looking ahead on an unfinished bar',
                    'Commissions',
                    'Swap',
                  ],
                  answer: 1,
                  explanation: 'Closed-bar logic reduces look-ahead bias in backtests.',
                },
              ],
            },
          },
        ],
      },
      {
        id: 'first-indicator',
        title: 'Build your first indicator',
        lessons: [
          {
            id: 'indicator-buffers',
            title: 'Indicator buffers',
            duration: '14 min',
            summary: 'Plot buffers, SetIndexBuffer, and drawing styles.',
            content: [
              {
                heading: 'Buffers are the plot',
                body: 'Custom indicators expose arrays (buffers) that MetaTrader draws. You fill them in OnCalculate and map them with SetIndexBuffer.',
              },
              {
                heading: 'Styles',
                body: 'DRAW_LINE, DRAW_HISTOGRAM, DRAW_ARROW — pick the style that matches the signal. Empty values should use EMPTY_VALUE so you do not draw garbage across the chart.',
              },
              {
                heading: 'Reuse in an EA',
                body: 'Once an indicator compiles, an EA can create it with iCustom and read buffer values. That is how you keep signal logic in one place.',
              },
            ],
            quiz: {
              passingScore: 70,
              questions: [
                {
                  id: 'i1',
                  prompt: 'What does SetIndexBuffer do?',
                  options: [
                    'Places a market order',
                    'Maps an array to an indicator plot',
                    'Changes account leverage',
                    'Opens MetaEditor',
                  ],
                  answer: 1,
                  explanation: 'SetIndexBuffer binds a buffer array to a drawing index.',
                },
                {
                  id: 'i2',
                  prompt: 'Why use EMPTY_VALUE in a buffer?',
                  options: [
                    'To mark lots',
                    'To skip drawing where there is no signal',
                    'To force a recompile',
                    'To reset the account',
                  ],
                  answer: 1,
                  explanation: 'EMPTY_VALUE tells the chart not to plot that bar.',
                },
                {
                  id: 'i3',
                  prompt: 'An EA can read a custom indicator using:',
                  options: ['Comment()', 'iCustom and buffer copies', 'MessageBox', 'Sleep only'],
                  answer: 1,
                  explanation: 'iCustom creates a handle; then you copy buffer data.',
                },
              ],
            },
          },
          {
            id: 'plotting-signals',
            title: 'Plotting signals',
            duration: '15 min',
            summary: 'Arrows, colors, and making a signal you can actually trade.',
            content: [
              {
                heading: 'A signal is a rule',
                body: 'Define the rule in words first: “Buy when fast MA crosses above slow MA on a closed bar.” Then encode it. Ambiguous rules become random bots.',
              },
              {
                heading: 'Visual debug',
                body: 'Plot arrows where you would enter. If the arrows do not match your intent, do not automate yet. The chart is cheaper than a live account.',
              },
              {
                heading: 'One idea per buffer',
                body: 'Do not overload a single buffer with buy, sell, and filter state. Separate plots keep the indicator readable.',
              },
            ],
            quiz: {
              passingScore: 70,
              questions: [
                {
                  id: 'p1',
                  prompt: 'Before coding a signal you should:',
                  options: [
                    'Max out lots',
                    'Write the rule in plain language',
                    'Disable logging',
                    'Skip the quiz',
                  ],
                  answer: 1,
                  explanation: 'A clear rule is the specification for the code.',
                },
                {
                  id: 'p2',
                  prompt: 'Plotting arrows on the chart is useful because:',
                  options: [
                    'It increases spread',
                    'You can visually verify the rule',
                    'It compiles faster',
                    'It hides losing trades',
                  ],
                  answer: 1,
                  explanation: 'Visual checks catch logic errors early.',
                },
                {
                  id: 'p3',
                  prompt: 'Why keep buy and sell plots separate?',
                  options: [
                    'MQL5 forbids one buffer',
                    'Readability and fewer mixed-up signals',
                    'It reduces commission',
                    'It changes the broker',
                  ],
                  answer: 1,
                  explanation: 'Separate buffers make signals easier to inspect and consume from an EA.',
                },
              ],
            },
          },
          {
            id: 'trend-filter',
            title: 'Practical: trend filter',
            duration: '22 min',
            summary: 'Combine a moving-average regime filter with a simple entry.',
            content: [
              {
                heading: 'Filter then trigger',
                body: 'A common pattern: trade long only when price is above a slow MA, then use a faster cross or breakout as the trigger. The filter cuts many counter-trend trades.',
              },
              {
                heading: 'Parameters are not magic',
                body: 'Fast 20 / slow 50 is a starting point, not a secret. Changing periods to fit one year of data is curve fitting. Test across symbols and years.',
              },
              {
                heading: 'What you will quiz on',
                body: 'You should be able to explain the difference between a regime filter and an entry trigger, and why both belong in a risk-aware system.',
              },
            ],
            quiz: {
              passingScore: 70,
              questions: [
                {
                  id: 'tf1',
                  prompt: 'A regime filter is meant to:',
                  options: [
                    'Replace risk management',
                    'Allow trades only in a chosen market condition',
                    'Guarantee profit',
                    'Disable the strategy tester',
                  ],
                  answer: 1,
                  explanation: 'Filters decide when the strategy is allowed to look for entries.',
                },
                {
                  id: 'tf2',
                  prompt: 'Optimizing MA periods on a single year of data mainly risks:',
                  options: ['Lower spread', 'Curve fitting', 'Faster execution', 'Better uptime'],
                  answer: 1,
                  explanation: 'Overfitting in-sample data often fails out of sample.',
                },
                {
                  id: 'tf3',
                  prompt: 'In “filter then trigger”, the trigger is:',
                  options: [
                    'The account currency',
                    'The specific entry rule inside the allowed regime',
                    'The VPS provider',
                    'The chart color',
                  ],
                  answer: 1,
                  explanation: 'The trigger is the actual entry condition after the filter passes.',
                },
              ],
            },
          },
        ],
      },
    ],
  },
  {
    id: 'price-action',
    slug: 'price-action-for-algo-traders',
    title: 'Price Action for Algo Traders',
    description:
      'Translate discretionary price-action ideas into rules an Expert Advisor can execute without second-guessing.',
    level: 'Beginner',
    duration: '3h 10m',
    lessonsCount: 4,
    price: 79,
    modules: [
      {
        id: 'pa-structure',
        title: 'Market structure in code',
        lessons: [
          {
            id: 'swings',
            title: 'Swing highs and lows',
            duration: '14 min',
            summary: 'Define pivots so a bot can see structure the way a discretionary trader does.',
            content: [
              {
                heading: 'A swing needs a rule',
                body: '“Looks like a high” is not code. A simple definition: a bar whose high is greater than N bars left and right. N is a parameter you must justify.',
              },
              {
                heading: 'Repainting',
                body: 'If a swing is only confirmed after N bars to the right, you cannot trade it on the forming bar. Build that delay into the EA or you will backtest a fantasy.',
              },
            ],
            quiz: {
              passingScore: 70,
              questions: [
                {
                  id: 's1',
                  prompt: 'A coded swing high should be defined by:',
                  options: [
                    'A gut feeling',
                    'An explicit comparison to neighboring bars',
                    'The broker’s logo',
                    'Random ticks',
                  ],
                  answer: 1,
                  explanation: 'Algorithms need a precise pivot definition.',
                },
                {
                  id: 's2',
                  prompt: 'Waiting for bars to the right of a pivot mainly avoids:',
                  options: ['Commission', 'Repainting / premature signals', 'Swap', 'Leverage changes'],
                  answer: 1,
                  explanation: 'Confirmation after the fact stops the swing from moving as new bars print.',
                },
                {
                  id: 's3',
                  prompt: 'If you trade an unconfirmed swing on bar 0, backtests may:',
                  options: [
                    'Be more honest',
                    'Look better than live results',
                    'Ignore spread',
                    'Disable AutoTrading',
                  ],
                  answer: 1,
                  explanation: 'Unconfirmed pivots often repaint and inflate historical performance.',
                },
              ],
            },
          },
          {
            id: 'breaks',
            title: 'Breaks and retests',
            duration: '16 min',
            summary: 'Turn a level break into an entry with invalidation.',
            content: [
              {
                heading: 'Break is not enough',
                body: 'Many failed breaks reverse immediately. A retest rule (enter on a pullback that holds the level) often reduces fake-outs — at the cost of missing some runners.',
              },
              {
                heading: 'Invalidation',
                body: 'Every setup needs a price where the idea is wrong. That price is your stop. Without it you have a hope, not a system.',
              },
            ],
            quiz: {
              passingScore: 70,
              questions: [
                {
                  id: 'b1',
                  prompt: 'A retest entry typically tries to reduce:',
                  options: ['Swap', 'False breakouts', 'Account currency', 'Chart periods'],
                  answer: 1,
                  explanation: 'Waiting for a hold after the break filters many failed breaks.',
                },
                {
                  id: 'b2',
                  prompt: 'Invalidation in a trading rule is:',
                  options: [
                    'Optional decoration',
                    'The price that proves the setup wrong',
                    'A compiler warning',
                    'The magic number',
                  ],
                  answer: 1,
                  explanation: 'Invalidation defines the stop and the risk of the trade.',
                },
                {
                  id: 'b3',
                  prompt: 'Missing some strong trends is often the cost of:',
                  options: ['Using a VPS', 'Stricter confirmation rules', 'A larger screen', 'More indicators on the chart'],
                  answer: 1,
                  explanation: 'Filters and retests skip some moves by design.',
                },
              ],
            },
          },
        ],
      },
      {
        id: 'pa-risk',
        title: 'From idea to order',
        lessons: [
          {
            id: 'stops',
            title: 'Stops that belong to the setup',
            duration: '12 min',
            summary: 'Place stops from structure, then size the position to a fixed risk.',
            content: [
              {
                heading: 'Stop first, size second',
                body: 'Measure the distance from entry to invalidation in money. Then choose lots so that a stop-out costs a fixed fraction of equity, not a random amount.',
              },
              {
                heading: 'Never reverse the order',
                body: 'Picking lots first and then “seeing where the stop fits” is how accounts blow up. Structure defines risk distance; size follows.',
              },
            ],
            quiz: {
              passingScore: 70,
              questions: [
                {
                  id: 'st1',
                  prompt: 'Position size should usually be calculated after you know:',
                  options: [
                    'The news calendar color',
                    'Entry and stop (risk distance)',
                    'The EA name',
                    'How many indicators you use',
                  ],
                  answer: 1,
                  explanation: 'Risk distance comes from the setup; lots are derived from that.',
                },
                {
                  id: 'st2',
                  prompt: 'Choosing lots before the stop typically:',
                  options: [
                    'Improves fill quality',
                    'Makes risk per trade inconsistent',
                    'Removes spread',
                    'Guarantees a win',
                  ],
                  answer: 1,
                  explanation: 'Lot-first sizing ignores how far the stop actually is.',
                },
                {
                  id: 'st3',
                  prompt: 'A fixed fraction of equity at risk per trade is an example of:',
                  options: ['Martingale', 'Risk-based position sizing', 'Hedging', 'Grid trading'],
                  answer: 1,
                  explanation: 'Percent-of-equity risk keeps losses comparable across trades.',
                },
              ],
            },
          },
          {
            id: 'checklist',
            title: 'Automation checklist',
            duration: '11 min',
            summary: 'A go-live list: logging, max trades, and what to do when the idea fails.',
            content: [
              {
                heading: 'Log the decision',
                body: 'Print or file why a trade was taken: filter, trigger, stop, lots. When something goes wrong you need a trail, not a mystery.',
              },
              {
                heading: 'Hard caps',
                body: 'Max open trades, max daily loss, and a kill switch if Drawdown exceeds a limit. Discretionary traders walk away; bots need the same rule in code.',
              },
            ],
            quiz: {
              passingScore: 70,
              questions: [
                {
                  id: 'c1',
                  prompt: 'Logging entry reasons helps you:',
                  options: [
                    'Increase leverage',
                    'Debug live behavior against the intended rules',
                    'Hide losing trades',
                    'Change the broker server',
                  ],
                  answer: 1,
                  explanation: 'A decision trail shows whether the EA did what you designed.',
                },
                {
                  id: 'c2',
                  prompt: 'A max daily loss cap is an example of:',
                  options: ['An indicator buffer', 'A risk kill-switch', 'A chart template', 'A magic number'],
                  answer: 1,
                  explanation: 'Hard limits stop the bot from compounding a bad day.',
                },
                {
                  id: 'c3',
                  prompt: 'Bots need coded walk-away rules because:',
                  options: [
                    'They never sleep unless you program limits',
                    'MQL5 cannot place orders',
                    'Charts cannot load',
                    'Quizzes replace backtests',
                  ],
                  answer: 0,
                  explanation: 'Without caps, an EA will keep trading through a disaster.',
                },
              ],
            },
          },
        ],
      },
    ],
  },
]

export function getCourseBySlug(slug) {
  return curriculum.find((course) => course.slug === slug) ?? null
}

export function flattenLessons(course) {
  if (!course) return []
  return course.modules.flatMap((module, moduleIndex) =>
    module.lessons.map((lesson, lessonIndex) => ({
      ...lesson,
      moduleId: module.id,
      moduleTitle: module.title,
      moduleIndex,
      lessonIndex,
    })),
  )
}

export function getLesson(course, lessonId) {
  return flattenLessons(course).find((lesson) => lesson.id === lessonId) ?? null
}

export function getNextLesson(course, lessonId) {
  const lessons = flattenLessons(course)
  const index = lessons.findIndex((lesson) => lesson.id === lessonId)
  if (index < 0 || index === lessons.length - 1) return null
  return lessons[index + 1]
}

export function getPreviousLesson(course, lessonId) {
  const lessons = flattenLessons(course)
  const index = lessons.findIndex((lesson) => lesson.id === lessonId)
  if (index <= 0) return null
  return lessons[index - 1]
}

export function isLessonUnlocked(course, lessonId, completedIds) {
  const lessons = flattenLessons(course)
  const index = lessons.findIndex((lesson) => lesson.id === lessonId)
  if (index <= 0) return true
  return completedIds.includes(lessons[index - 1].id)
}

export function courseStats(course, completedIds) {
  const lessons = flattenLessons(course)
  const total = lessons.length
  const completed = lessons.filter((lesson) => completedIds.includes(lesson.id)).length
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100)
  const next = lessons.find((lesson) => !completedIds.includes(lesson.id)) ?? null
  return { total, completed, percent, next }
}
