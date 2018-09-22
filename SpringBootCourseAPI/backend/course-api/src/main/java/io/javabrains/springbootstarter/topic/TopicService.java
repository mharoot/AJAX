package io.javabrains.springbootstarter.topic;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TopicService {

	@Autowired
	private TopicRepository topicRepository;
	// immutable otherwise we get an error trying to add to a static list
	private List<Topic> topics = new ArrayList<>(Arrays.asList(
			new Topic("1", "Spring Framework","Spring Framework Description"),
			new Topic("2", "Core Java","Core Java Description"),
			new Topic("3", "JavaScript", "JavaScript Description")
			));

	// static
//	private List<Topic> topics = Arrays.asList(
//			new Topic("1", "Spring Framework","Spring Framework Description"),
//			new Topic("2", "Core Java","Core Java Description"),
//			new Topic("3", "JavaScript", "JavaScript Description")
//			);

	public List<Topic> getAllTopics() {
		List<Topic> topics = new ArrayList<>();
		topicRepository.findAll().forEach(topics::add); // java 8 lamda basics topics::add
		return topics;
	}
	
	public Topic getTopic(String id) {
//		return topics.stream().filter(t -> t.getId().equals(id)).findFirst().get();
		return topicRepository.findOne(id);
	}

	public Topic addTopic(Topic topic) {
//		topics.add(topic);
		topicRepository.save(topic);
		return topic;
	}

//	public Topic updateTopic(Topic topic, String id) {
	public Topic updateTopic(Topic topic) {
//		for (int i = 0; i < topics.size(); i++) {
//			Topic t = topics.get(i);
//			if (t.getId().equals(id)) {
//				topics.set(i, topic);
//				return;
//			}
//		}
		return topicRepository.save(topic);
	}

	public void deleteTopic(String id) {
//		topics.removeIf(t -> t.getId().equals(id));
		topicRepository.delete(id);
	}
	
}
