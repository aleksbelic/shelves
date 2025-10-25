export type Book = {
	id: number;
	title: string;
	author?: string[];
	publisher?: string;
	category?: string[];
	isbn?: string;
	publishYear?: number;
	edition?: string;
	language?: string;
	readingStatus?: string;
};
