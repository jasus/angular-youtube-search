export class YoutubeSearchResult {
    private id: string;
    private title: string;
    private description: string;
    private thumbnailUrl: string;
    private videoUrl: string;
    private publishedAt: Date;

    constructor(obj?: any) {
        this.id = obj && obj.id || null;
        this.title = obj && obj.title || null;
        this.description = obj && obj.description || null;
        this.thumbnailUrl = obj && obj.thumbnailUrl || null;
        this.videoUrl = obj && obj.videoUrl || `https://www.youtube.com/watch?v=${this.id}`;
        this.publishedAt = obj && new Date(obj.publishedAt) || null;
    }


    /**
     * Getter $publishedAt
     * @return {Date}
     */
    public get $publishedAt(): Date {
        return this.publishedAt;
    }

    /**
     * Setter $publishedAt
     * @param {Date} value
     */
    public set $publishedAt(value: Date) {
        this.publishedAt = value;
    }


    /**
     * Getter $id
     * @return {string}
     */
    public get $id(): string {
        return this.id;
    }

    /**
     * Getter $title
     * @return {string}
     */
    public get $title(): string {
        return this.title;
    }

    /**
     * Getter $description
     * @return {string}
     */
    public get $description(): string {
        return this.description;
    }

    /**
     * Getter $thumbnailUrl
     * @return {string}
     */
    public get $thumbnailUrl(): string {
        return this.thumbnailUrl;
    }

    /**
     * Getter $videoUrl
     * @return {string}
     */
    public get $videoUrl(): string {
        return this.videoUrl;
    }

    /**
     * Setter $id
     * @param {string} value
     */
    public set $id(value: string) {
        this.id = value;
    }

    /**
     * Setter $title
     * @param {string} value
     */
    public set $title(value: string) {
        this.title = value;
    }

    /**
     * Setter $description
     * @param {string} value
     */
    public set $description(value: string) {
        this.description = value;
    }

    /**
     * Setter $thumbnailUrl
     * @param {string} value
     */
    public set $thumbnailUrl(value: string) {
        this.thumbnailUrl = value;
    }

    /**
     * Setter $videoUrl
     * @param {string} value
     */
    public set $videoUrl(value: string) {
        this.videoUrl = value;
    }


}
