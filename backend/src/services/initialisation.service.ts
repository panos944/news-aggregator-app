import Source, { ISource } from "../models/Source";

const sources: Partial<ISource>[] = [
    { name: "Real.gr", rssUrl: "https://www.real.gr/teleutaies_eidiseis/feed/" },
    { name: "Instyle", rssUrl: "https://www.instyle.gr/feed/" },
    { name: "Real Kiosk", rssUrl: "https://placeholder-rss-feed.com/realkiosk/feed/" },
    { name: "The Cars", rssUrl: "https://www.thecars.gr/feed/" },
    { name: "Real Player", rssUrl: "https://radioshows.real.gr/TOC.xml" },
];

export class InitializationService {
    /**
     * Ensures all required sources exist in the database
     * Only adds missing sources, doesn't delete existing ones
     */
    static async ensureSourcesExist(): Promise<void> {
        try {
            console.log('Checking if news sources exist...');
            
            for (const sourceData of sources) {
                const existingSource = await Source.findOne({ name: sourceData.name });
                
                if (!existingSource) {
                    await Source.create(sourceData);
                    console.log(`Added source: ${sourceData.name}`);
                } else {
                    console.log(`Source already exists: ${sourceData.name}`);
                }
            }
            
            const totalSources = await Source.countDocuments();
            console.log(`Total sources in database: ${totalSources}`);
            
        } catch (error) {
            console.error('Error ensuring sources exist:', error);
            throw error;
        }
    }

    /**
     * Complete application initialization
     * Ensures database is ready and populated
     */
    static async initializeApplication(): Promise<void> {
        console.log('Initializing News Aggregator application...');
        
        try {
            // Ensure sources exist
            await this.ensureSourcesExist();
            
            console.log('Application initialization completed successfully');
            
        } catch (error) {
            console.error('Application initialization failed:', error);
            throw error;
        }
    }
}