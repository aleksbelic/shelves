export type Book = {
	id: number;
	title: string;
	author: string[];
	genre?: string[];
	publisherName: string;
	isbn: string;
	publishYear?: number;
	edition?: string;
	languageName: string;
	readingStatusName?: string;
};
