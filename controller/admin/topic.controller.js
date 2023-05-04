const Topics = require('../../models/Topic.model')

// Create a new topic
const createTopic = async (req, res) => {
    const { title, course_id } = req.body;
    try {
      const topic = await Topics.create({ title, course_id });
      res.status(201).json({success:true,message: 'Topic created successfully', topic});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

// Create Bulk Topic
const createBulkTopic = async (req, res) => {
    const { title, course_id } = req.body;
    try {
      const newTopic = await Topics.create({ title, course_id });
      res.status(201).json(newTopic);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  
// Get all topics
const getAllTopics = async (req, res) => {
  try {
    const topics = await Topics.findAll();
    res.status(200).json(topics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single topic by ID
const getTopicById = async (req, res) => {
  const { id } = req.params;
  try {
    const topic = await Topics.findByPk(id);
    if (!topic) throw new Error('Topic not found');
    res.status(200).json(topic);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Update an existing topic by ID
const updateTopicById = async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  // console.log(req.body)
  try {
    const topic = await Topics.findByPk(id);
    if (!topic) throw new Error('Topic not found');
    topic.title = title;

    await topic.save();
    res.status(200).json({success:true,message: 'Topic updated successfully', topic});
  } catch (error) {
    res.status(500).json({success:false, error: error.message });
  }
};

// Delete a topic by ID
const deleteTopicById = async (req, res) => {
  const { id } = req.params;
  try {
    const topic = await Topics.findByPk(id);
    if (!topic) throw new Error('Topic not found');
    await topic.destroy();
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllTopics,
  getTopicById,
  createTopic,
  updateTopicById,
  deleteTopicById,
  createBulkTopic
};
