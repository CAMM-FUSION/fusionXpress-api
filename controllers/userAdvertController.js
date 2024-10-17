

// Get all adverts (any user)
export const getAdverts = async (req, res) => {
    try {
      const adverts = await Advert.find(); 
      res.status(200).json({ success: true, data: adverts});
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Failed to fetch adverts' });
    }
  };
  
  
  // Get a single advert (any user)
  export const getAdvert = async (req, res) => {
    try {
      const advert = await Advert.findById(req.params.id);
      if (!advert) return res.status(404).json({ success: false, message: 'Advert not found' });
      res.status(200).json({ success: true, data: advert });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Failed to fetch advert' });
    }
  };