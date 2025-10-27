export type Book = {
	id: number;
	title: string;
	author: string[];
	genre?: string[];
	publisher: string;
	isbn: string;
	publishYear?: number;
	edition?: string;
	language: string;
	readingStatus?: string;
};
