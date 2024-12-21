import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Google Generative AI client
const geminiApiKey = process.env.GEMINI_API_KEY;
if (!geminiApiKey) {
    throw new Error('GEMINI_API_KEY is not defined in environment variables');
}
const geminiClient = new GoogleGenerativeAI(geminiApiKey);

// Create a model instance
const model = geminiClient.getGenerativeModel({ model: "gemini-pro" });

// Function to transform text using the Google Generative AI
async function geminiTextToText(input: string): Promise<string> {
    try {
        // Use the model to generate content
        const result = await model.generateContent(input);
        const response = await result.response;

        // Extract and return the text output
        const text = response.text();
        if (!text) {
            throw new Error("No response generated.");
        }

        return text;
    } catch (error) {
        console.error('Error during Google Generative AI text transformation:', error);
        throw new Error('Failed to transform text using Google Generative AI');
    }
}

// POST request handler
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const inputText = body?.inputText;

        if (!inputText) {
            return NextResponse.json({ error: 'Missing inputText in request body' }, { status: 400 });
        }

        const transformedText = await geminiTextToText(inputText);
        return NextResponse.json({ transformedText }, { status: 200 });
    } catch (error) {
        console.error('Error in POST handler:', error);
        return NextResponse.json({ error: 'An internal server error occurred' }, { status: 500 });
    }
}

// GET request handler
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const inputText = searchParams.get('inputText');

        if (!inputText) {
            return NextResponse.json({ error: 'Missing inputText parameter' }, { status: 400 });
        }

        const transformedText = await geminiTextToText(inputText);
        return NextResponse.json({ transformedText }, { status: 200 });
    } catch (error) {
        console.error('Error in GET handler:', error);
        return NextResponse.json({ error: 'An internal server error occurred' }, { status: 500 });
    }
}
