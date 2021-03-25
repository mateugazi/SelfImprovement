/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.model';
import { ProductsController } from './products.controller';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { resourceLimits } from 'node:worker_threads';

@Injectable()
export class ProductsService {
    private products: Product[] = [];

    constructor(@InjectModel('Product') private readonly productModel: Model<Product>) {}

    async insertProduct(title: string, description: string, price: number) {
        const newProduct = new this.productModel({title, description, price});
        const result = await newProduct.save();
        console.log(result);
        return result.id as string;
    }

    async getProducts() {
        const products = await this.productModel.find().exec();
        return products.map(prod => ({
            id: prod.id, 
            title: prod.title, 
            description: prod.description,
            price: prod.price
        })) as Product[];
    }

    async getSingleProduct(productId: string) {
        const product = await this.findProduct(productId);
        return {
            id: product.id,
            title: product.title,
            description: product.description,
            price: product.price
        };
    }
    

    async updateProduct(productId: string, title: string, description: string, price: number) {
        try{
            const updatedProduct = await this.findProduct(productId);
            if (title) updatedProduct.title = title;
            if (description) updatedProduct.description = description;
            if (price) updatedProduct.price = price;
            updatedProduct.save();
            return updatedProduct as Product;
        } catch(err) {
            throw new NotFoundException('Could not find the product');
        }
    } 
    
    async deleteProduct(prodId: string) {
        try {
            await this.productModel.deleteOne({ _id: prodId }).exec();
            return {message: "Product deleted!"}
        } catch(err) {
            throw new NotFoundException('Could not find the product');
        }
    } 

    private async findProduct(id: string): Promise<Product> {
        let product;
        try {
            product = await this.productModel.findById(id);
        } catch(err) {
            throw new NotFoundException('Could not find the product');
        }
        if (!product) {
            throw new NotFoundException('Could not find the product');
        }
        return product;
    }
}