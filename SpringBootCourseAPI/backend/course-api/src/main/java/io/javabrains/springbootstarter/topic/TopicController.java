package io.javabrains.springbootstarter.topic;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:8081")
public class TopicController {
	
	@Autowired
	private TopicService topicService;
	
	
	// CREATE
	@RequestMapping(method=RequestMethod.POST, value="/topics")
	public Topic addTopic(@RequestBody Topic topic) {
		return topicService.addTopic(topic);
	}
	
	// READ
	@RequestMapping("/topics")
	public List<Topic> getAllTopics() {
		return topicService.getAllTopics();
	}
	
	@RequestMapping("/topics/{id}")
	public Topic getTopic(@PathVariable String id) {
		return topicService.getTopic(id);
	}
	
	// UDATE
	@RequestMapping(method=RequestMethod.PUT, value="/topics/{id}")
	public Topic updateTopic(@RequestBody Topic topic, @PathVariable String id) {
//		topicService.updateTopic(topic, id);
		return topicService.updateTopic(topic);
	}
	
	// DELETE
	@RequestMapping(method=RequestMethod.DELETE, value="/topics/{id}")
	public void updateTopic(@PathVariable String id) {
		topicService.deleteTopic(id);
	}
}
