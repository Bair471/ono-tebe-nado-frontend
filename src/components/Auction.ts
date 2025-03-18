const testContainer = ensureElement<HTMLElement>('#test-section');
const abcTemplate = ensureElement<HTMLTemplateElement>('#abc');
const abcContainer = cloneTemplate(abcTemplate);

interface IAbc {
    aaa: string;
    bbb: string;
    ccc: string;
}

class AbcComponent extends Component<IAbc> {
    private events: IEvents;
    private _aaa: HTMLElement;
    private _bbb: HTMLElement;
    private _ccc: HTMLElement;
    constructor(container: HTMLElement, events: IEvents) {
        super(container);

        this.events = events;

        this._aaa = ensureElement<HTMLElement>('.aaa', container);
        this._bbb = ensureElement<HTMLElement>('.bbb', container);
        this._ccc = ensureElement<HTMLElement>('.ccc', container);
    }

    set aaa(value: string) {
        this.setText(this._aaa, value);
    }

    set bbb(value: string) {
        this.setText(this._bbb, value);
    }

    set ccc(value: string) {
        this.setText(this._ccc, value);
    }
}

const abc = new AbcComponent(abcContainer, events);
testContainer.append(abc.render({
    aaa: 'AAA',
    bbb: 'BBB',
    ccc: 'CCC'
}));