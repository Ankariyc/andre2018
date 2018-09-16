export class Timer {
    private startMilliseconds: number;
    private nMilliseconds: number;
    private nSeconds: number;
    private nMinutes: number;

    private dspMilliseconds: string;
    private dspSeconds: string;
    private dspMinutes: string;

    constructor() {
        this.startMilliseconds = 0;
        this.nMilliseconds = 0;
        this.nSeconds = 0;
        this.nMinutes = 0;

        this.dspMilliseconds = '00';
        this.dspSeconds = '00';
        this.dspMinutes = '00';
    }

    init(startMilliseconds: number): void {
        this.startMilliseconds = startMilliseconds;
        this.nMilliseconds = 0;
        this.nSeconds = 0;
        this.nMinutes = 0;
    }

    reset(): void {
        this.startMilliseconds = 0;
        this.nMilliseconds = 0;
        this.nSeconds = 0;
        this.nMinutes = 0;

        this.dspMilliseconds = '00';
        this.dspSeconds = '00';
        this.dspMinutes = '00';
    }

    update(currMilliseconds: number): void {
        const spanMilliseconds = currMilliseconds - this.startMilliseconds;

        this.nMilliseconds = Math.floor((spanMilliseconds % 1000 / 10));
        this.nSeconds = Math.floor((spanMilliseconds / 1000) % 60);
        this.nMinutes = Math.floor((spanMilliseconds / (1000 * 60)) % 60);

        this.dspMilliseconds = (this.nMilliseconds < 10) ? '0' + this.nMilliseconds.toString() : this.nMilliseconds.toString();
        this.dspSeconds = (this.nSeconds < 10) ? '0' + this.nSeconds.toString() : this.nSeconds.toString();
        this.dspMinutes = (this.nMinutes < 10) ? '0' + this.nMinutes.toString() : this.nMinutes.toString();
    }



    /**
     * Setter $startMilliseconds
     * @param {number} value
     */
    public set setStartMilliseconds(value: number) {
        this.startMilliseconds = value;
    }


    /**
     * Getter $startMilliseconds
     * @return {number}
     */
    public get getStartMilliseconds(): number {
        return this.startMilliseconds;
    }


    /**
     * Getter $dspMilliseconds
     * @return {string}
     */
    public get getDspMilliseconds(): string {
        return this.dspMilliseconds;
    }

    /**
     * Getter $dspSeconds
     * @return {string}
     */
    public get getDspSeconds(): string {
        return this.dspSeconds;
    }

    /**
     * Getter $dspMinutes
     * @return {string}
     */
    public get getDspMinutes(): string {
        return this.dspMinutes;
    }

}
