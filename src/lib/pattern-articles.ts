/**
 * Pattern Library — 15 articles on recurring psychological patterns
 *
 * Each article targets a specific behavioral query for SEO.
 * Structure: slug, title, category, metaDescription, content (H2/H3 + paragraphs)
 *
 * These are the cornerstone content for category ownership of
 * "Behavioral Pattern Intelligence."
 */

export interface PatternArticle {
  slug: string;
  title: string;
  category: string;
  metaDescription: string;
  readTime: string;
  content: { heading: string; body: string[] }[];
}

export const PATTERN_ARTICLES: PatternArticle[] = [
  {
    slug: 'the-rescuer-pattern',
    title: 'The Rescuer Pattern',
    category: 'Relationship Patterns',
    metaDescription: 'Why you keep attracting people who need saving — and how the Rescuer pattern keeps you trapped in one-sided relationships.',
    readTime: '7 min',
    content: [
      {
        heading: 'What is the Rescuer Pattern?',
        body: [
          'The Rescuer pattern is a behavioral loop where you consistently attract and pursue people who appear to need saving — emotionally, financially, or practically. The pattern feels like love. It is actually a strategy for earning worth through over-functioning.',
          'The Rescuer doesn\'t rescue because they are strong. They rescue because they learned early that love was conditional on being useful. The rescue is the price of admission to the relationship.',
        ],
      },
      {
        heading: 'How the Pattern Forms',
        body: [
          'The Rescuer pattern typically forms in childhood when a parent or caregiver required the child to meet their emotional needs. This is called parentification — the child becomes the parent to the parent.',
          'The child learns: I am loved when I am needed. I am safe when I am useful. When I stop rescuing, I disappear. This belief hardens into a behavioral script that runs every intimate relationship in adulthood.',
        ],
      },
      {
        heading: 'The Rescue Cycle',
        body: [
          '1. You meet someone who is struggling — emotionally unavailable, financially unstable, or in crisis.',
          '2. You feel a powerful pull to help. The pull feels like love. It is actually recognition — your nervous system recognizes a familiar dynamic.',
          '3. You over-function. You give more than your share. You make excuses for their behavior. You postpone your own needs.',
          '4. The other person takes. Sometimes gratefully, sometimes resentfully. The relationship becomes asymmetric.',
          '5. You feel exhausted and unappreciated. You threaten to leave. The other person has a crisis. You stay.',
          '6. Repeat.',
        ],
      },
      {
        heading: 'The Hidden Payoff',
        body: [
          'The Rescuer pattern persists because it has a hidden payoff: control. When you are the one giving, you are in the power position. You control whether the relationship continues. You control the narrative.',
          'The fear underneath the rescue is: if I stop being needed, I will be abandoned. The rescue is a defense against that fear — a strategy to ensure the other person can never leave because they owe you too much.',
        ],
      },
      {
        heading: 'Breaking the Pattern',
        body: [
          'The pattern breaks when you recognize that rescuing is not love — it is control disguised as care. Real love allows the other person to struggle. Real love trusts them to grow.',
          'The practice: stop. Do exactly half. Notice what happens. The relationship will either recalibrate — or reveal itself. Both outcomes are useful information.',
        ],
      },
    ],
  },
  {
    slug: 'the-avoidance-loop',
    title: 'The Avoidance Loop',
    category: 'Behavioral Loops',
    metaDescription: 'Why you sidestep what matters most — and how the Avoidance loop protects you from feelings you haven\'t learned to handle.',
    readTime: '6 min',
    content: [
      {
        heading: 'What is the Avoidance Loop?',
        body: [
          'The Avoidance loop is a behavioral pattern where you consistently steer around the conversations, decisions, and emotions that matter most. It looks like procrastination. It is actually a nervous system defense.',
          'Avoidance is not laziness. It is not weakness. It is a protective strategy built when facing a feeling was more dangerous than the consequence of avoiding it.',
        ],
      },
      {
        heading: 'The Three Layers of Avoidance',
        body: [
          'Layer 1: Task avoidance — postponing the email, the call, the decision. This is the visible layer.',
          'Layer 2: Emotional avoidance — staying busy to avoid feeling. The busyness is not ambition; it is anesthesia.',
          'Layer 3: Identity avoidance — avoiding the question of who you actually are. This is the deepest layer, and the one most people never reach.',
        ],
      },
      {
        heading: 'How the Loop Runs',
        body: [
          '1. A feeling arises — usually fear, grief, or shame.',
          '2. Your nervous system detects the feeling as a threat.',
          '3. You redirect attention — to your phone, to work, to a small task.',
          '4. The feeling goes underground. The avoidance feels like relief.',
          '5. The unresolved feeling compounds. It returns louder.',
          '6. You avoid harder. The loop tightens.',
        ],
      },
      {
        heading: 'The Cost of Avoidance',
        body: [
          'The cost is not just the thing you\'re avoiding. The cost is the life you\'re not living because you\'re too busy steering around it. Avoidance shrinks your world. The things you avoid grow larger in your imagination. The life you want grows smaller in your reality.',
        ],
      },
      {
        heading: 'Breaking the Loop',
        body: [
          'The loop breaks when you learn to feel the feeling without acting on the avoidance impulse. This is not willpower. It is nervous system capacity — built slowly, through practice.',
          'The practice: when the avoidance impulse arises, pause for 90 seconds. Name the feeling. Locate it in your body. Breathe into it. Then decide — not from the avoidance, but from the awareness.',
        ],
      },
    ],
  },
  {
    slug: 'the-performer-trap',
    title: 'The Performer Trap',
    category: 'Identity Patterns',
    metaDescription: 'Why you wear a mask in every relationship — and how the Performer pattern disconnects you from who you actually are.',
    readTime: '7 min',
    content: [
      {
        heading: 'What is the Performer Trap?',
        body: [
          'The Performer trap is a behavioral pattern where you adapt your personality to match what each situation expects of you. You are the good employee at work, the fun friend at dinner, the perfect partner at home. None of these are you. All of them are performances.',
          'The Performer doesn\'t perform because they are fake. They perform because being real was never safe. The performance is a survival strategy.',
        ],
      },
      {
        heading: 'How the Trap Forms',
        body: [
          'The Performer trap forms in childhood when love was conditional on behavior. The child learns: I am loved when I am what they want me to be. I am rejected when I am myself.',
          'The child begins to perform. The performance becomes so consistent that the child forgets who they were before the performance started. The performer and the self merge. The original self goes underground.',
        ],
      },
      {
        heading: 'The Cost of the Performance',
        body: [
          'The cost is intimacy. When you perform, you cannot be known. People love the performance — and you know it. The love feels hollow because they are loving someone who doesn\'t exist.',
          'The Performer is surrounded by people and chronically lonely. The loneliness is not from lack of connection. It is from the gap between who they present and who they are.',
        ],
      },
      {
        heading: 'The Performance Drop',
        body: [
          'The Performer eventually hits a wall. The performance becomes unsustainable. The body starts to break — anxiety, depression, autoimmune issues. The nervous system can no longer maintain the mask.',
          'This is not a breakdown. It is a breakthrough. The performance is collapsing so the original self can emerge. The work is not to fix the performance. The work is to meet the self that was hidden underneath.',
        ],
      },
      {
        heading: 'Breaking the Trap',
        body: [
          'The trap breaks when you begin to notice the performance in real time. Who am I being right now? Who am I trying to please? What would happen if I dropped the mask for 5 minutes?',
          'The practice: spend one hour per week with no audience. No posting. No sharing. No performing. Just you. The self will be disorienting at first. It has been underground for a long time.',
        ],
      },
    ],
  },
  {
    slug: 'the-controlling-pattern',
    title: 'The Controlling Pattern',
    category: 'Behavioral Patterns',
    metaDescription: 'Why you grip too tight — and how the Controlling pattern destroys the relationships you\'re trying to protect.',
    readTime: '6 min',
    content: [
      {
        heading: 'What is the Controlling Pattern?',
        body: [
          'The Controlling pattern is a behavioral loop where you grip every situation, relationship, and outcome too tight. It looks like responsibility. It is actually fear — fear that if you let go, everything will fall apart.',
          'The Controller doesn\'t control because they are powerful. They control because they are terrified. The control is a defense against the chaos they experienced when they were too small to manage it.',
        ],
      },
      {
        heading: 'The Illusion of Control',
        body: [
          'The Controller believes they are preventing disaster. In reality, they are creating the disaster they fear. People being controlled eventually rebel — or collapse. The Controller interprets both as proof they need to control more.',
          'The loop tightens. The Controller grips harder. The people around them withdraw further. The Controller feels more alone. They grip harder still.',
        ],
      },
      {
        heading: 'The Origin',
        body: [
          'The pattern forms in childhood chaos — an alcoholic parent, a volatile household, a caregiving failure. The child learns: if I don\'t manage this, no one will. The management becomes identity. The Controller doesn\'t know who they are without something to manage.',
        ],
      },
      {
        heading: 'Breaking the Pattern',
        body: [
          'The pattern breaks when the Controller recognizes that control is not safety — it is the absence of trust. Trust in others. Trust in themselves. Trust in the world to continue existing without their management.',
          'The practice: identify one thing you are gripping. Release it for one week. Watch what happens. The world does not end. The relationship recalibrates. The Controller begins to trust.',
        ],
      },
    ],
  },
  {
    slug: 'the-numbing-strategy',
    title: 'The Numbing Strategy',
    category: 'Behavioral Patterns',
    metaDescription: 'Why you go flat to survive the day — and how the Numbing strategy protects you from feelings that need to be felt.',
    readTime: '5 min',
    content: [
      {
        heading: 'What is the Numbing Strategy?',
        body: [
          'The Numbing strategy is a behavioral pattern where you go emotionally flat to survive situations that feel overwhelming. It looks like calm. It is actually shutdown — the nervous system disconnecting from feeling to protect you from flooding.',
          'Numbing is not a choice. It is an automatic response that fires when the nervous system detects more emotion than it can process. The numbness is a circuit breaker.',
        ],
      },
      {
        heading: 'How Numbing Manifests',
        body: [
          'Numbing shows up as: scrolling for hours with no memory of what you saw. Eating without tasting. Having sex without feeling. Working without producing. Being present without being there.',
          'The numbness feels like peace. It is not peace. Peace is the presence of aliveness. Numbness is the absence of it.',
        ],
      },
      {
        heading: 'The Origin',
        body: [
          'Numbing forms when feeling was dangerous — when a child\'s emotions were punished, ignored, or overwhelmed them. The child learns: feeling is not safe. The nervous system builds a wall between the child and their own emotional life.',
          'The wall works. The child survives. The cost is access to their own interior. The adult cannot feel joy, grief, desire, or love at full resolution. Everything is muffled.',
        ],
      },
      {
        heading: 'Breaking the Strategy',
        body: [
          'The strategy breaks when you begin to feel the feelings you numbed — slowly, in safe doses, with support. The numbness is not the problem. The feelings underneath it are the work.',
          'The practice: when you notice numbness, ask — what am I not feeling right now? The answer will surface. Let it. Do not fix it. Do not analyze it. Just feel it for 90 seconds. The numbness will begin to thaw.',
        ],
      },
    ],
  },
  {
    slug: 'the-overworking-pattern',
    title: 'The Overworking Pattern',
    category: 'Behavioral Loops',
    metaDescription: 'Why productivity became your avoidance strategy — and how the Overworking pattern hides the feeling you refuse to feel.',
    readTime: '7 min',
    content: [
      {
        heading: 'What is the Overworking Pattern?',
        body: [
          'The Overworking pattern is a behavioral loop where productivity becomes the primary strategy for avoiding uncomfortable feelings. It looks like ambition. It is actually anesthesia — the work is not the goal; the work is the avoidance.',
          'The Overworker doesn\'t work because they love the work. They work because stopping means feeling. The busyness keeps the feeling at bay.',
        ],
      },
      {
        heading: 'The Productivity Trap',
        body: [
          'Society rewards the Overworking pattern. The Overworker is praised for their dedication, promoted for their output, admired for their drive. The pattern is reinforced at every level — until the body breaks.',
          'The break looks like burnout, but it is not burnout. Burnout is exhaustion from too much work. The Overworker\'s break is exhaustion from too much avoidance. The work was never the problem. The feeling underneath it was.',
        ],
      },
      {
        heading: 'The Hidden Feeling',
        body: [
          'Every Overworker has a feeling they are avoiding. Common ones: grief over a loss they never processed. Fear of being unlovable if they stop producing. Shame about who they actually are without the work. Anger at a parent who only valued achievement.',
          'The work expands to fill the space the feeling needs. When the work stops — on vacation, on a weekend, in bed at night — the feeling surfaces. The Overworker reaches for their phone. The loop continues.',
        ],
      },
      {
        heading: 'Breaking the Pattern',
        body: [
          'The pattern breaks when the Overworker stops working at a fixed hour — not because the work is done, but because the hour has arrived. The feeling will surface. The work is to feel it.',
          'The practice: stop working at a specific time every day for 30 days. Notice what surfaces. The feeling will be uncomfortable. It will not kill you. It is the feeling you have been avoiding your entire career.',
        ],
      },
    ],
  },
  {
    slug: 'the-people-pleasing-loop',
    title: 'The People-Pleasing Loop',
    category: 'Relationship Patterns',
    metaDescription: 'Why you say yes when you mean no — and how the People-Pleasing loop erodes your sense of self one concession at a time.',
    readTime: '6 min',
    content: [
      {
        heading: 'What is the People-Pleasing Loop?',
        body: [
          'The People-Pleasing loop is a behavioral pattern where you consistently prioritize others\' needs, preferences, and emotions over your own. It looks like kindness. It is actually a strategy for safety — if everyone is happy, no one will hurt me.',
          'The People-Pleaser doesn\'t please because they are generous. They please because they are afraid. The pleasing is a defense against conflict, rejection, and abandonment.',
        ],
      },
      {
        heading: 'The Yes That Means No',
        body: [
          'Every People-Pleaser has said yes when they meant no. The yes feels safe in the moment. The cost arrives later — resentment, exhaustion, and the slow erosion of self-respect.',
          'The People-Pleaser eventually doesn\'t know what they want. They have spent so long mirroring others\' preferences that their own have gone offline. The question "what do you want for dinner?" produces panic.',
        ],
      },
      {
        heading: 'The Origin',
        body: [
          'The pattern forms in childhood when the child\'s needs were inconvenient — when expressing a preference caused conflict, when having feelings was punished, when love was withdrawn for non-compliance.',
          'The child learns: my needs are a burden. My preferences cause conflict. I am safe when I am what others need me to be. The pleasing becomes automatic. The self goes into hiding.',
        ],
      },
      {
        heading: 'Breaking the Loop',
        body: [
          'The loop breaks when the People-Pleaser begins to say no — small nos at first, then bigger ones. Each no feels like a crisis. It is not. It is the self returning.',
          'The practice: say one no per day. Do not explain it. Do not apologize for it. Notice what happens. The world does not end. The relationship recalibrates. The People-Pleaser begins to exist.',
        ],
      },
    ],
  },
  {
    slug: 'the-overthinking-loop',
    title: 'The Overthinking Loop',
    category: 'Behavioral Loops',
    metaDescription: 'Why you think your way out of feeling — and how the Overthinking loop keeps you stuck in analysis instead of action.',
    readTime: '6 min',
    content: [
      {
        heading: 'What is the Overthinking Loop?',
        body: [
          'The Overthinking loop is a behavioral pattern where you process every situation through endless analysis — replaying conversations, predicting outcomes, scanning for what you missed. It looks like intelligence. It is actually anxiety wearing a thinking costume.',
          'The Overthinker doesn\'t think because they are smart. They think because feeling is unbearable. The thinking is a defense against the emotion — if I can understand it, I can control it. If I can control it, I am safe.',
        ],
      },
      {
        heading: 'The Analysis Trap',
        body: [
          'The Overthinker believes more thinking will produce clarity. It never does. More thinking produces more thinking. The loop has no exit valve because the exit is action — and action requires feeling, which is what the Overthinker is avoiding.',
          'The Overthinker rehearses a life they are not living. They imagine the conversation they will have, the decision they will make, the future they will create. The rehearsal feels productive. It is avoidance.',
        ],
      },
      {
        heading: 'The Origin',
        body: [
          'The pattern forms when a child learned that feeling was dangerous and thinking was safe. The thinking became a way to manage emotions without actually experiencing them. The Overthinker can describe their feelings in exquisite detail — and feel none of them.',
        ],
      },
      {
        heading: 'Breaking the Loop',
        body: [
          'The loop breaks when the Overthinker learns to act before they have thought it through. Not recklessly — but with the understanding that perfect understanding is an illusion. The clarity comes after the action, not before it.',
          'The practice: when the loop starts, write 3 sentences. Then close the document. Then do one thing. The loop will restart. Notice it. Do the next thing anyway.',
        ],
      },
    ],
  },
  {
    slug: 'the-withdrawal-pattern',
    title: 'The Withdrawal Pattern',
    category: 'Relationship Patterns',
    metaDescription: 'Why you disappear before being left — and how the Withdrawal pattern keeps you isolated in the name of self-protection.',
    readTime: '5 min',
    content: [
      {
        heading: 'What is the Withdrawal Pattern?',
        body: [
          'The Withdrawal pattern is a behavioral loop where you pull away from relationships — emotionally, physically, or digitally — before the other person can leave you. It looks like independence. It is actually pre-emptive abandonment.',
          'The Withdrawer doesn\'t leave because they want to. They leave because staying feels like waiting to be left. The withdrawal is a defense against rejection — if I leave first, the rejection can\'t happen.',
        ],
      },
      {
        heading: 'The Push-Pull Dynamic',
        body: [
          'The Withdrawer creates the very abandonment they fear. They pull away. The other person feels the distance. The other person eventually stops trying. The Withdrawer interprets this as proof: see, they were going to leave me anyway.',
          'The loop is invisible to the Withdrawer. They believe they are protecting themselves. They are actually orchestrating the rejection they fear.',
        ],
      },
      {
        heading: 'The Origin',
        body: [
          'The pattern forms when a child experienced abandonment — physical (a parent left) or emotional (a parent was present but unavailable). The child learns: people leave. The only question is when. The withdrawal is the child\'s way of controlling the timing.',
        ],
      },
      {
        heading: 'Breaking the Pattern',
        body: [
          'The pattern breaks when the Withdrawer stays — not forever, but long enough to discover that staying does not automatically mean being left. The nervous system has to learn a new reality: some people stay.',
          'The practice: when the withdrawal impulse arises, name it. Tell the other person: I\'m feeling the pull to disappear. I\'m going to stay. The act of naming breaks the pattern\'s invisibility.',
        ],
      },
    ],
  },
  {
    slug: 'the-inner-critic',
    title: 'The Inner Critic',
    category: 'Inner Voices',
    metaDescription: 'Why the voice in your head finds fault in everything — and how the Inner Critic pattern runs your life from the shadows.',
    readTime: '7 min',
    content: [
      {
        heading: 'What is the Inner Critic?',
        body: [
          'The Inner Critic is the internal voice that finds fault in everything you do — your work, your appearance, your relationships, your existence. It sounds like you. It is actually an internalized voice from your past.',
          'The Critic is not your own thoughts. It is the voice of a parent, teacher, or caregiver that you absorbed so thoroughly it became indistinguishable from your own interior. You didn\'t choose it. You inherited it.',
        ],
      },
      {
        heading: 'How the Critic Operates',
        body: [
          'The Critic operates through comparison, prediction, and retrospective analysis. It compares you to others (and you always lose). It predicts your failure (and the prediction feels like fact). It replays your past mistakes (and magnifies them).',
          'The Critic is most active when you are about to do something brave — apply for the job, send the message, share the work. The criticism spikes because the Critic is trying to protect you from the risk of failure. The protection is a prison.',
        ],
      },
      {
        heading: 'The Critic\'s Origin',
        body: [
          'The Critic forms when a child received criticism instead of feedback — when mistakes were punished, when effort was dismissed, when the child learned that being seen meant being judged.',
          'The child internalizes the critical voice because believing the criticism feels safer than rejecting it. If the criticism is true, the child can fix it. If the criticism is false, the parent is wrong — and that possibility is too destabilizing to accept.',
        ],
      },
      {
        heading: 'Breaking the Pattern',
        body: [
          'The pattern breaks when you learn to distinguish the Critic\'s voice from your own. The Critic is not your thoughts. It is a recording. The recording can be observed, questioned, and ultimately turned down.',
          'The practice: when the Critic speaks, ask — whose voice is this? The answer will surface. It is rarely yours. Then ask — would I say this to a friend? If not, do not say it to yourself.',
        ],
      },
    ],
  },
  {
    slug: 'the-inner-child',
    title: 'The Inner Child',
    category: 'Inner Voices',
    metaDescription: 'Why the child-you still runs your adult life — and how the Inner Child pattern drives your deepest reactions.',
    readTime: '6 min',
    content: [
      {
        heading: 'What is the Inner Child?',
        body: [
          'The Inner Child is the part of your psyche that formed in childhood and continues to drive your adult reactions — especially the ones that feel disproportionate, irrational, or confusing. The child is not a metaphor. It is a live neural pattern.',
          'When you react to a small slight with big rage, when you collapse at mild criticism, when you feel abandoned by a delayed text — that is the Inner Child, responding to the present through the lens of the past.',
        ],
      },
      {
        heading: 'How the Child Drives Adult Behavior',
        body: [
          'The Inner Child drives behavior through emotional flashbacks — moments when a present trigger activates a past feeling. The feeling belongs to the past, but it is felt in the present. The reaction is sized for the past, not the present.',
          'This is why you can be a competent adult in every area of life and still feel like a helpless child in specific moments — with a partner, a boss, a parent. The child is age-specific. It only activates in dynamics that mirror its original wound.',
        ],
      },
      {
        heading: 'The Child\'s Needs',
        body: [
          'The Inner Child has needs that were not met in childhood — for safety, for being seen, for unconditional love, for being allowed to feel. These needs do not disappear with age. They go underground and drive adult behavior from beneath.',
          'Every adult overreaction is a child\'s unmet need demanding to be heard. The need is not the problem. The strategy for meeting it is. The adult reaches for the wrong things — approval, substances, control — because they don\'t know what the child actually needs.',
        ],
      },
      {
        heading: 'Integration',
        body: [
          'The pattern integrates when the adult learns to parent the child — to meet the needs that were not met, to provide the safety that was missing, to allow the feelings that were forbidden.',
          'The practice: when a reaction feels disproportionate, ask — how old do I feel right now? The answer will be a specific age. That is the child. Speak to them. Tell them they are safe. Tell them they are allowed to feel. The integration is slow, but it is real.',
        ],
      },
    ],
  },
  {
    slug: 'the-fear-of-abandonment',
    title: 'The Fear of Abandonment',
    category: 'Relationship Patterns',
    metaDescription: 'Why you feel abandoned by a delayed text — and how the fear of abandonment drives your most destructive relationship patterns.',
    readTime: '7 min',
    content: [
      {
        heading: 'What is the Fear of Abandonment?',
        body: [
          'The fear of abandonment is a nervous system response that activates when you perceive — accurately or inaccurately — that someone is pulling away. The fear is not rational. It is not sized to the present. It is sized to a past loss.',
          'A delayed text, a cancelled plan, a flat tone — these register as existential threats because they echo an earlier abandonment. The nervous system cannot distinguish the present from the past. It responds to both as one.',
        ],
      },
      {
        heading: 'How the Fear Drives Behavior',
        body: [
          'The fear drives behavior through three strategies: clinging (pursuing harder to prevent the abandonment), withdrawing (leaving first to control the timing), and testing (creating scenarios to prove the other person will stay).',
          'All three strategies produce the abandonment they fear. The clinging exhausts the other person. The withdrawing creates distance. The testing creates conflict. The fear is self-fulfilling.',
        ],
      },
      {
        heading: 'The Origin',
        body: [
          'The fear forms when a child experienced abandonment — physical (a parent left, died, or was absent) or emotional (a parent was present but emotionally unavailable). The child learns: people leave. The only variable is when. Every relationship is lived in the shadow of that certainty.',
        ],
      },
      {
        heading: 'Distinguishing Past from Present',
        body: [
          'The fear integrates when you learn to distinguish the past from the present. The fear is real. The threat may not be. A delayed text is not a parent leaving. A flat tone is not emotional withdrawal. The nervous system needs to learn this — slowly, through repetition.',
          'The practice: when the fear spikes, ask — what is actually happening right now? Not what does it feel like is happening. What is actually, factually happening? The gap between the two is where the past is leaking into the present.',
        ],
      },
    ],
  },
  {
    slug: 'the-fear-of-visibility',
    title: 'The Fear of Being Seen',
    category: 'Identity Patterns',
    metaDescription: 'Why you attract unavailable people — and how the fear of being seen keeps you hidden from the relationships that would require you to be real.',
    readTime: '5 min',
    content: [
      {
        heading: 'What is the Fear of Being Seen?',
        body: [
          'The fear of being seen is a behavioral pattern where you avoid situations that require you to be visible — speaking up, sharing your work, being fully present in a relationship. It looks like humility. It is actually fear — being seen was never safe.',
          'The pattern drives a specific relationship dynamic: you attract unavailable people because available people require you to be real. Unavailable people let you stay hidden. Available people are terrifying.',
        ],
      },
      {
        heading: 'The Hiding Strategy',
        body: [
          'The hiding takes many forms: over-functioning for others so the focus stays on them. Self-deprecating so no one expects too much. Choosing partners who are emotionally absent so intimacy is never required. Building a life that looks full from the outside but is empty of being known.',
          'The hider is surrounded by people and unknown. The unknown-ness feels safe. It is actually the slowest form of self-abandonment.',
        ],
      },
      {
        heading: 'The Origin',
        body: [
          'The fear forms when a child was visible and it was dangerous — when being seen meant being criticized, mocked, or punished. The child learns: visibility is a threat. Hiding is survival. The hiding becomes so consistent the child forgets they are hiding.',
        ],
      },
      {
        heading: 'Breaking the Pattern',
        body: [
          'The pattern breaks when you allow yourself to be seen in small, safe doses — and discover that being seen does not automatically mean being hurt. The nervous system has to learn a new reality: visibility can be safe.',
          'The practice: share one true thing per week with someone who has earned it. Not the biggest truth. A small one. Notice what happens. The world does not end. The relationship deepens. The hiding begins to thaw.',
        ],
      },
    ],
  },
  {
    slug: 'the-imposter-pattern',
    title: 'The Imposter Pattern',
    category: 'Identity Patterns',
    metaDescription: 'Why you feel like a fraud despite evidence of success — and how the Imposter pattern keeps you from owning your actual competence.',
    readTime: '6 min',
    content: [
      {
        heading: 'What is the Imposter Pattern?',
        body: [
          'The Imposter pattern is the persistent belief that you are not as competent as others perceive you to be — despite external evidence of your success. You live in fear of being "found out." The pattern is not humility. It is a neural pattern that cannot internalize achievement.',
          'The Imposter doesn\'t feel like a fraud because they are one. They feel like a fraud because their nervous system never learned to register success as real. Every achievement is filtered through a belief: I got lucky. I fooled them. Next time I will fail.',
        ],
      },
      {
        heading: 'The Achievement Loop',
        body: [
          'The Imposter achieves. The achievement produces brief relief. The relief fades. The Imposter attributes the achievement to luck, timing, or deception. The fear of being found out returns. The Imposter achieves again — to prove they are not a fraud. The loop has no exit.',
          'The loop is exhausting. The Imposter is often high-performing and chronically anxious. The anxiety is not about the work. The anxiety is about being seen — because being seen means the fraud will be discovered.',
        ],
      },
      {
        heading: 'The Origin',
        body: [
          'The pattern forms when a child\'s achievements were never allowed to land — when success was dismissed, minimized, or never acknowledged. The child learns: my accomplishments are not real. The belief hardens. The adult cannot feel their own competence, no matter how much evidence accumulates.',
        ],
      },
      {
        heading: 'Breaking the Pattern',
        body: [
          'The pattern breaks when the Imposter begins to internalize evidence — not through affirmation, but through sustained attention to fact. The work is not to believe you are competent. The work is to stop disbelieving the evidence that you are.',
          'The practice: write down every achievement — small ones, large ones. Read the list weekly. The list is not bragging. It is data. The Imposter has been ignoring data their entire life. The practice is to stop ignoring it.',
        ],
      },
    ],
  },
  {
    slug: 'the-perfectionism-loop',
    title: 'The Perfectionism Loop',
    category: 'Behavioral Loops',
    metaDescription: 'Why perfectionism is not a strength — and how the Perfectionism loop prevents you from sharing the work that would change your life.',
    readTime: '6 min',
    content: [
      {
        heading: 'What is the Perfectionism Loop?',
        body: [
          'The Perfectionism loop is a behavioral pattern where you refine, revise, and withhold your work — indefinitely — because it is never "ready." It looks like high standards. It is actually fear — fear that imperfect work means an imperfect self.',
          'The Perfectionist doesn\'t perfect because they care about quality. They perfect because sharing imperfect work feels like exposure. The perfection is a defense — if I can make it flawless, no one can criticize it. The flawlessness is impossible. The defense fails. The work stays hidden.',
        ],
      },
      {
        heading: 'The Cost of Perfection',
        body: [
          'The cost is the work itself — the book unwritten, the business unlaunched, the relationship uninitiated, the life unlived. The Perfectionist has a cemetery of almost-finished projects. Each one was "not ready." Each one was actually "not safe to share."',
          'The Perfectionist is often admired for their standards. The admiration reinforces the pattern. The Perfectionist does not realize the standards are a cage. The cage feels like integrity.',
        ],
      },
      {
        heading: 'The Origin',
        body: [
          'The pattern forms when a child learned that mistakes were unacceptable — when imperfect work was criticized, when effort was dismissed unless the result was flawless. The child learns: I am only lovable when I am perfect. The belief is impossible to satisfy. The child spends their life trying.',
        ],
      },
      {
        heading: 'Breaking the Loop',
        body: [
          'The loop breaks when the Perfectionist shares imperfect work — and discovers that the criticism they feared does not arrive, or if it does, it does not destroy them. The nervous system has to learn a new reality: imperfect work can be valuable. Imperfect self can be loved.',
          'The practice: ship one imperfect thing per week. A short email. A rough draft. A half-formed idea. Notice what happens. The world does not end. The work lands. The Perfectionist begins to trust that done is better than perfect — and that done is the only way to eventually become good.',
        ],
      },
    ],
  },
];
