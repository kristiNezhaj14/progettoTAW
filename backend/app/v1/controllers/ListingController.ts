import { Request, Response } from 'express';
import { getModel as getListingModel } from '../models/listing';

const Listing = getListingModel();

// Crea un nuovo listing
export const createListing = async (req: Request, res: Response): Promise<void> => {
    try {
        // Verifica il corpo della richiesta
        const {
            title,
            course,
            university,
            location,
            startPrice,
            reservePrice,
            duration,
            author,
            edition,
            description,
            coverImageUrl,
        } = req.body;

        if (
            !title || !course || !university || !location ||
            !startPrice || !reservePrice || !duration || !author || !edition
        ) {
            res.status(400).json({ error: 'Tutti i campi obbligatori devono essere forniti.' });
            return;
        }

        // Calcola la data di scadenza
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + duration);

        // Crea un nuovo oggetto Listing
        const newListing = new Listing({
            title,
            course,
            university,
            location,
            startPrice,
            reservePrice,
            duration,
            author,
            edition,
            description,
            coverImageUrl,
            createdBy: req.auth?.id, // ID utente autenticato
            expiresAt,
        });

        // Salva nel database
        const savedListing = await newListing.save();
        res.status(201).json({ message: 'Listing creato con successo.', listing: savedListing });
    } catch (error) {
        console.error('Errore durante la creazione del listing:', error);
        res.status(500).json({ error: 'Errore interno del server.' });
    }
};

// Recupera tutti i listings
export const getListings = async (req: Request, res: Response): Promise<void> => {
    try {
        const listings = await Listing.find();
        res.status(200).json({ listings });
    } catch (error) {
        console.error('Errore durante il recupero dei listings:', error);
        res.status(500).json({ error: 'Errore interno del server.' });
    }
};

export default {
    createListing,
    getListings,
};
