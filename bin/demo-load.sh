for i in `seq 1 20`;
        do
                nohup bin/demo.sh $i &
		echo $i
        done    
