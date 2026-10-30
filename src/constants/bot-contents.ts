type TTabsTitle = {
    [key: string]: string | number;
};

type TDashboardTabIndex = {
    [key: string]: number;
};

export const tabs_title: TTabsTitle = Object.freeze({
    WORKSPACE: 'Workspace',
    CHART: 'Chart',
});

export const DBOT_TABS: TDashboardTabIndex = Object.freeze({
    DASHBOARD: 0,
    AUTO_SIGNALS: 1,
    AHMED_LEARNING: 2,
    FREE_BOTS: 3,
    AUTO_DIGITS: 4,
    SPEEDLAB: 5,
    HEDGE: 6,
    CHART: 7,
    DTRADER: 8,
    COPY_TRADING: 9,
    REPORT: 10,
    ANALYSIS: 11,
    TUTORIAL: 12,
    TRADING_SOFTWARE: 13,
    // BOT_BUILDER is an alias for the Bot Builder tab (AHMED_LEARNING). It must stay
    // equal to AHMED_LEARNING's index — the Tabs component renders nothing when
    // active_tab doesn't match any child index, so a standalone sentinel value here
    // (e.g. 99) silently blanks the screen when clicked from Dashboard cards, the
    // saved-bot list, tours, or announcements.
    BOT_BUILDER: 2,
});

export const MAX_STRATEGIES = 10;

export const TAB_IDS = [
    'id-dbot-dashboard',
    'id-auto-signals',
    'id-ahmed-learning',
    'id-bot-library',
    'id-auto-digits',
    'id-speed-lab',
    'id-pro-hedge',
    'id-charts',
    'id-dtrader',
    'id-copy-trading',
    'id-reports',
    'id-analysis',
    'id-tutorial',
    'id-trading-software',
];

export const DEBOUNCE_INTERVAL_TIME = 500;
