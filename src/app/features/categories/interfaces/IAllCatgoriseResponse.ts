export interface Metadata {
	currentPage: number;
	numberOfPages: number;
	limit: number;
}

export interface IAllCatgoriseResponse {
	_id: string;
	name: string;
	slug: string;
	image: string;
	createdAt: string;
	updatedAt: string;
}

export interface IAllCatgoriseResponse {
	results: number;
	metadata: Metadata;
	data: IAllCatgoriseResponse[];
}